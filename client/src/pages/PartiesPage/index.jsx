import React, { useState, useEffect } from 'react';
import { Container, Input, InputGroupText } from "reactstrap";
import { Table, InputGroup, FormControl } from 'react-bootstrap';
import Web3 from "web3";
import { useEth, useUserContext } from "../../contexts/contexts";
import { ContractName } from "../../contexts/EthContext/ContractName";
import { Header } from "../../components/components";
import Web3Converter from "../../utils/Web3Converter";
import "../../assets/styles/parties-page.css";

let PartyItem = (props) => {
  const closedClassName = "party-item accordion-section-header";
  const openClassName = "party-item accordion-section-header open";
  const handleOpenChange = () => {
    props.setOpen(!props.isOpen);
  };
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const renderCandidateTable = (candidates) => {
    return (
      <Table striped bordered hover responsive style={{ textAlign: 'center' }}>

        <thead style={{ backgroundColor: "#0b4faf", color: "white" }}>
          <tr>
            <th style={{ width: '50px' }}>Constituency</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {candidates.filter(candidate => candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) || candidate.constituency.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((candidate, index) => {
              return (
                <tr key={index}>
                  <td>{candidate.constituency}</td>
                  <td>{candidate.name}</td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    );
  };
  return (
    <div className="wp-block-ctcl-election-website-accordion-section-block accordion-section-wrapper">

      <h2 className={props.isOpen ? openClassName : closedClassName}
        style={{ margin: '8px 0' }}>
        <span onClick={handleOpenChange} style={{ fontSize: (props.isOpen ? '32px' : '24px'), fontWeight: (props.isOpen ? 'bold' : 'normal') }}>{props.party.name}</span>
      </h2>

      <section className="party-item-content accordion-section-content">
        <p><b>Chairman:</b> {props.party.chairmanName}</p>
        <p><b>CNIC:</b> {props.party.chairmanCnic}</p>
        <p><b>Alias:</b> {props.party._alias}</p>
        <p><b>Postal Address:</b> {props.party.postal_add}</p>

        <div className='party-candidates'>
          <div className='party-candidates-div'>
            <p><b>List of NA Candidates:</b></p>
            <InputGroup className="mb-3" style={{ height: '30px' }}>
              <InputGroup.Text style={{ fontSize: '1.6rem' }}>Search</InputGroup.Text>
              <FormControl style={{ height: 'auto', fontSize: '1.6rem' }} onChange={handleSearch} placeholder="Search by name or constituency..." />
            </InputGroup>
            {renderCandidateTable(props.party.na_cands_list)}

          </div>
          <div className='party-candidates-div'>
            <p><b>List of PA Candidates:</b></p>
            <InputGroup className="mb-3" style={{ height: '30px' }}>
              <InputGroup.Text style={{ fontSize: '1.6rem' }}>Search</InputGroup.Text>
              <FormControl style={{ height: 'auto', fontSize: '1.6rem' }} onChange={handleSearch} placeholder="Search by name or constituency..." />
            </InputGroup>
            {renderCandidateTable(props.party.pa_cands_list)}
          </div>

        </div>
      </section>

    </div>
  );
};


function PartiesPage() {
  const { state: contracts, } = useEth();

  const [partiesList, setPartiesList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPartiesList = partiesList.filter(party => {
    const query = searchQuery.toLowerCase();
    return party.name.toLowerCase().includes(query) || party._alias.toLowerCase().includes(query);
  });

  const [openIndex, setOpenIndex] = useState(null);
  const handleOpenChange = (index) => {
    if (index === openIndex) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  useEffect(() => {
    if (contracts.initialized && contracts.initialized[ContractName.PartyManager].accounts && partiesList.length < 1 && !isLoaded)
      loadParties();
  }, [contracts.initialized, partiesList]);

  const loadParties = async () => {
    setIsLoaded(true);

    const parties_add_list = await contracts.initialized[ContractName.PartyManager].contract
      .methods.getParties()
      .call({ from: contracts.initialized[ContractName.PartyManager].accounts[0] });
    console.log("Parties List => ", parties_add_list);
    let tempPartiesList = [...partiesList];

    for (let i = 0; i < parties_add_list.length; i++) {
      try {

        const partyContract = new contracts.uninitialized[ContractName.Party].web3.eth
          .Contract(contracts.uninitialized[ContractName.Party].artifact.abi, parties_add_list[i]);

        const tempConstituenciesList = await partyContract.methods.getConstituencies().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] });
        let na_constituenciesList = [];
        let pa_constituenciesList = [];
        for (let i = 0; i < tempConstituenciesList.length; i++) {
          const constName = Web3.utils.hexToUtf8(tempConstituenciesList[i]);

          const party_constituencies = await partyContract.methods.party_constituencies(tempConstituenciesList[i]).call({ from: contracts.uninitialized[ContractName.Party].accounts[0] });
          const candidate_add = await partyContract.methods.candidates(party_constituencies.candidate_cnic).call({ from: contracts.uninitialized[ContractName.Party].accounts[0] });

          const candContract = new contracts.uninitialized[ContractName.Candidate].web3.eth
            .Contract(contracts.uninitialized[ContractName.Candidate].artifact.abi, candidate_add);

          const cand_name = Web3.utils.hexToUtf8(await candContract.methods.fullname().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] }));
          if (constName[0] == 'N') {
            na_constituenciesList.push({ name: cand_name, constituency: constName });
          }
          else if (constName[0] == 'P') {
            pa_constituenciesList.push({ name: cand_name, constituency: constName });
          }
        }
        console.log(na_constituenciesList);
        console.log(pa_constituenciesList);

        let party = {
          name: Web3.utils.hexToUtf8(await partyContract.methods.name().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] })),
          chairmanName: Web3.utils.hexToUtf8(await partyContract.methods.getChairmanName().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] })),
          chairmanCnic: Web3.utils.hexToUtf8(await partyContract.methods.getChairmanCnic().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] })),
          postal_add: Web3.utils.hexToUtf8(await partyContract.methods.postal_add().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] })),
          _alias: Web3.utils.hexToUtf8(await partyContract.methods._alias().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] })),

          na_cands_list: na_constituenciesList.sort((a, b) => a.constituency.localeCompare(b.constituency)),
          pa_cands_list: pa_constituenciesList.sort((a, b) => a.constituency.localeCompare(b.constituency))
        };

        tempPartiesList.push(party);
        setPartiesList([...tempPartiesList]);
      }
      catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Header />
      <main className="parties-page-main post-425 page type-page status-publish hentry">
        <h1>Politiacal Parties</h1>
        <InputGroup className="search-box">
          <InputGroupText className="search-icon">Search</InputGroupText>
          <Input placeholder="Search for a party..." onChange={handleSearch} />
        </InputGroup>
        <section className="wp-block-ctcl-election-website-accordion-group-block accordion-group">
          {filteredPartiesList.map((party, index) => {
            const isOpen = index === openIndex;
            return (
              <PartyItem
                key={party.name}
                party={party}
                isOpen={isOpen}
                setOpen={() => handleOpenChange(index)}
              ></PartyItem>
            );
          })}
        </section>
      </main>
    </>
  );
}

export default PartiesPage;
