import React, { useEffect, useState } from "react";
import { Container, Input, InputGroup, InputGroupText, Table, Button } from "reactstrap";
import { Header } from "../../components/components";
import { useEth, useUserContext } from "../../contexts/contexts";
import { ContractName } from "../../contexts/EthContext/ContractName";
import "../../assets/styles/polling-page.css"
import Web3 from "web3";
import Web3Converter from "../../utils/Web3Converter";


const PollingPage = () => {
  const { state: contracts, } = useEth();
  const { user, selectedPoll } = useUserContext();
  const [isLoaded, setIsLoaded] = useState(false);

  const [candidatesList, setCandidatesList] = useState([
    // { id: 1, party_alias: "PTI", party_name: "Pakistan Tahreek-e-Insaaf", cand_name: "Imran Khan" },
    // { id: 2, party_alias: "PML-N", party_name: "Pakistan Muslim League Nawaz", cand_name: "Shehbaz Sharif" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleCandidateSelect = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCandidates = candidatesList.filter(
    (c) =>
      c.cand_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.party_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.party_alias.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = () => {
    console.log("Selected Candidate:", selectedCandidate);
    submitVote();
  };
  const submitVote = async () => {
    try {
      console.log(selectedPoll.constituencyAdd);
      console.log(user.cnic);
      console.log(selectedCandidate.candidate_cnic);
      console.log(selectedCandidate.party_add);

      const electionContract = new contracts.uninitialized[ContractName.Election].web3.eth
        .Contract(contracts.uninitialized[ContractName.Election].artifact.abi, selectedPoll.electionAdd);
      const constContract = new contracts.uninitialized[ContractName.Constituency].web3.eth
        .Contract(contracts.uninitialized[ContractName.Constituency].artifact.abi, selectedPoll.constituencyAdd);

      await electionContract.methods.castVote(selectedPoll.constituencyAdd, user.cnic, selectedCandidate.candidate_cnic, selectedCandidate.party_add)
        .send({ from: contracts.uninitialized[ContractName.Election].accounts[0] });
      console.log(
        await constContract.methods.casted_votes(0)
          .call({ from: contracts.uninitialized[ContractName.Constituency].accounts[0] })
      )
      // await constContract.methods.castVote(user.cnic, selectedCandidate.candidate_cnic, selectedCandidate.party_add)
      //   .send({ from: contracts.uninitialized[ContractName.Constituency].accounts[0] });
      // console.log(
      //   await constContract.methods.casted_votes(0)
      //     .call({ from: contracts.uninitialized[ContractName.Constituency].accounts[0] })
      // )
    } catch (err) {
      console.log(err);
    }
  }
  const loadCandidatesList = async () => {
    try {
      console.log(selectedPoll.constituencyAdd);
      const constContract = new contracts.uninitialized[ContractName.Constituency].web3.eth
        .Contract(contracts.uninitialized[ContractName.Constituency].artifact.abi, selectedPoll.constituencyAdd);

      const parties = await constContract.methods.getParties().call({ from: contracts.uninitialized[ContractName.Constituency].accounts[0] });
      // const election_type = await constContract.methods.election_type().call({ from: contracts.uninitialized[ContractName.GeneralElection].accounts[0] });
      console.log(parties);
      const tempCandsList = [...candidatesList];
      for (let i = 0; i < parties.length; i++) {
        try {
          const partyContract = new contracts.uninitialized[ContractName.Party].web3.eth
            .Contract(contracts.uninitialized[ContractName.Party].artifact.abi, parties[i]);
          const partyCandDetail = await partyContract.methods.getElectionConstituencyDetail(Web3Converter.strToBytes8(selectedPoll.pollName))
            .call({ from: contracts.uninitialized[ContractName.Party].accounts[0] });
          tempCandsList.push({
            id: (tempCandsList.length > 0) ? tempCandsList[tempCandsList.length - 1].id + 1 : 0,
            party_alias: Web3.utils.hexToUtf8(partyCandDetail.party_alias),
            party_name: Web3.utils.hexToUtf8(partyCandDetail.party_name),
            cand_name: Web3.utils.hexToUtf8(partyCandDetail.candidate_name),
            candidate_cnic: partyCandDetail.candidate_cnic,
            party_add: parties[i]
          });

          console.log(Web3.utils.hexToUtf8(partyCandDetail.candidate_name));
          console.log(Web3.utils.hexToUtf8(partyCandDetail.party_name));
          console.log(Web3.utils.hexToUtf8(partyCandDetail.party_alias));
        } catch (err) {
          console.log(err);
        }

      }
      setCandidatesList(tempCandsList);
    } catch (err) {
      console.log(err);
    }

  };

  useEffect(() => {
    if (contracts.initialized && contracts.initialized[ContractName.ElectionManager].accounts && candidatesList.length < 1 && !isLoaded
      && selectedPoll.constituencyAdd)
      loadCandidatesList();
  }, [contracts.initialized, candidatesList, selectedPoll]);

  return (
    <>
      <Header isLanding={false} />

      <main className="polling-page-main theme-blue">
        <Container>
          <div className="polling-name-row">
            {/* <h1 className="my-4">General Elections 2023</h1> */}
            <div>
              <h1 className="my-4">{selectedPoll.pollName}</h1>
              <h3 className="my-4">{selectedPoll.electionName}</h3>

            </div>
            <Button className="mt-5"
              style={{ height: 'max-content', marginRight: '0px', borderRadius: '3px', fontWeight: '600', fontSize: 'medium', padding: '8px 30px', backgroundColor: 'seagreen' }}
              onClick={handleSubmit} disabled={!selectedCandidate}>
              Submit Vote
            </Button>
          </div>
          <div className="wp-block-group" style={{ paddingTop: '30px', paddingBottom: '10px' }}>
            <div className="polling-form contact-form" id="polling-form">

              <div className='polling-form-row'>
                <InputGroup className="search-box">
                  <InputGroupText className="search-icon">Search</InputGroupText>
                  <Input placeholder="Search for a candidate or party..." onChange={handleSearch} />
                </InputGroup>

              </div>
            </div>
          </div>

          <Table hover>
            <thead style={{ backgroundColor: "#0b4faf", color: "white" }}>

              <tr>
                <th>Candidate Name</th>
                <th>Party Name</th>
                <th>Alias</th>
                <th>Vote</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((candidate) => (
                <tr key={candidate.id}>
                  <td>{candidate.cand_name}</td>
                  <td>{candidate.party_name}</td>
                  <td>{candidate.party_alias}</td>
                  <td>
                    <input
                      type="radio"
                      name="selectedCandidate"
                      checked={selectedCandidate?.id === candidate.id}
                      onChange={() => handleCandidateSelect(candidate)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </main>
    </>
  );
};

export default PollingPage;
