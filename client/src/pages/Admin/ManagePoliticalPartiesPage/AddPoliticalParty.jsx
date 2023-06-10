import React, { useState, useRef, useEffect } from 'react';
import Papa from 'papaparse';
import Table from 'react-bootstrap/Table';
import Web3 from "web3";
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import { Header, NotificationBox } from "../../../components/components";
import Web3Converter from '../../../utils/Web3Converter';
import "../../../assets/styles/stylesheet.css";
import "../../../assets/styles/add-political-party-page.css";

function AddPoliticalParty() {
  // contracts.initialized
  const { state: contracts, } = useEth();

  const [partyName, setPartyName] = useState("Pakistan People's Party");
  const [chairmanCnic, setChairmanCnic] = useState("99999-9999999-1");
  const [postalAdd, setPostalAdd] = useState("postal-ppp");
  const [alias, setAlias] = useState("PPP");

  const [csvData, setCsvData] = useState(null);
  const candidatesFileInputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const handleChairmanCnicChange = (event) => {
    var value = event.target.value;
    var regex;
    var digitsOnly = value.replace(/\D/g, ''); // Remove non-digits

    if (digitsOnly.length > 12) {
      value = [digitsOnly.slice(0, 5), '-', digitsOnly.slice(5, 12), '-', digitsOnly.slice(12)].join('');
      regex = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;
    } else if (digitsOnly.length > 5) {
      value = [digitsOnly.slice(0, 5), '-', digitsOnly.slice(5, digitsOnly.length)].join('');
      regex = /^[0-9]{5}-[0-9]*$/;
    } else if (digitsOnly.length <= 5) {
      value = digitsOnly.slice(0, digitsOnly.length);
      regex = /^\d+-?\d*$/;
    }
    if ((regex.test(value) && value.length <= 15) || value === "") {
      setChairmanCnic(value);
    }
  };

  const handlePartyNameChange = (event) => {
    let value = event.target.value;
    setPartyName(value);
  };

  const handlePostalAddChange = (event) => {
    let value = event.target.value;
    setPostalAdd(value);
  }

  const handleAliasChange = (event) => {
    let value = event.target.value;
    setAlias(value);
  }
  const handleCandidatesClick = () => {
    candidatesFileInputRef.current.click();
  };
  const handleCandidatesChange = (event) => {
    const fileUploaded = event.target.files[0];

    Papa.parse(fileUploaded, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setCsvData(results.data);
        setErrorMessage(null);
      },
      error: (error) => {
        setCsvData(null);
        setErrorMessage(error.message);
      }
    });

  }

  const handleSubmit = async () => {
    if (false) {
      alert('Input feilds incorrect!');
    }
    else {
      var _party_cands = [];
      var _party_cands_constituencies = [];

      csvData.forEach(cand => {
        _party_cands.push(Web3Converter.strToBytes16(cand.CNIC));
        _party_cands_constituencies.push(Web3Converter.strToBytes8(cand.Constituency));
      });

      const party = {
        name: Web3Converter.strToBytes32(partyName),
        chairman_cnic: Web3Converter.strToBytes16(chairmanCnic),
        postal_add: Web3Converter.strToBytes32(postalAdd),
        _alias: Web3Converter.strToBytes8(alias)
      }
      await contracts.initialized[ContractName.PartyManager].contract.methods
        .addParty(
          party.name, party.chairman_cnic, party.postal_add, party._alias,
          _party_cands, _party_cands_constituencies
        )
        .send({ from: contracts.initialized[ContractName.PartyManager].accounts[0] });


      // //---------------------------------- TESTING -----------------------------------
      // const parties_count = await contracts.initialized[ContractName.PartyManager].contract.methods
      //   .parties_count()
      //   .call({ from: contracts.initialized[ContractName.PartyManager].accounts[0] });
      // console.log(parties_count);

      // for (let i = 0; i < parties_count; i++) {
      //   const partyAdd = await contracts.initialized[ContractName.PartyManager].contract.methods
      //     .parties(i)
      //     .call({ from: contracts.initialized[ContractName.PartyManager].accounts[0] });

      //   console.log(partyAdd);

      //   try {
      //     const partyContract = new contracts.uninitialized[ContractName.Party].web3.eth
      //       .Contract(contracts.uninitialized[ContractName.Party].artifact.abi, partyAdd);

      //     const party = {
      //       id: await partyContract.methods.id().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] })
      //       , name: await partyContract.methods.name().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] })
      //       , alias: Web3.utils.hexToUtf8(await partyContract.methods._alias().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] }))
      //       , cands_count: await partyContract.methods.candidates_count().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] })
      //       , constituencies: await partyContract.methods.getConstituencies().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] })
      //       , party_const: []
      //     };

      //     console.log(party);

      //     for (let j = 0; j < party.constituencies.length; j++) {
      //       const party_const = await partyContract.methods.party_constituencies(party.constituencies[j]).call({ from: contracts.uninitialized[ContractName.Party].accounts[0] });

      //       const candAdd = await partyContract.methods.candidates(party_const.candidate_cnic).call({ from: contracts.uninitialized[ContractName.Party].accounts[0] })
      //       const candContract = new contracts.uninitialized[ContractName.Candidate].web3.eth
      //         .Contract(contracts.uninitialized[ContractName.Candidate].artifact.abi, candAdd);


      //       const cand = {
      //         fullname: Web3.utils.hexToUtf8(await candContract.methods.fullname().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
      //         , age: await candContract.methods.age().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] })
      //         , gender: Web3.utils.hexToUtf8(await candContract.methods.gender().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
      //         , cnic: Web3.utils.hexToUtf8(await candContract.methods.cnic().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
      //         , contact: Web3.utils.hexToUtf8(await candContract.methods.contact().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
      //         , father_name: Web3.utils.hexToUtf8(await candContract.methods.father_name().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
      //         , pAdd: Web3.utils.hexToUtf8(await candContract.methods.permanent_add().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
      //         , lAdd: Web3.utils.hexToUtf8(await candContract.methods.local_add().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
      //         , province: Web3.utils.hexToUtf8(await candContract.methods.province().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
      //         , party: Web3.utils.hexToUtf8(await candContract.methods.party().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
      //       };

      //       party.party_const.push(cand);
      //     }
      //     console.log(party);
      //   }
      //   catch (err) {
      //     console.log(err);
      //   }
      // }


      setShowNotification(true);

      setPartyName('');
      setChairmanCnic('');
      setPostalAdd('');
      setAlias('');
      setCsvData(null);
    }
  };


  return (
    <>
      <Header isLanding={false} />

      <main className="add-political-party-page-main theme-blue">
        {showNotification && <NotificationBox message="New Party added!" />}
        <h2>ADD POLITICAL PARTY</h2>

        <div className="wp-block-group">
          <div className="add-political-party-form contact-form" id="add-political-party-form">

            <div className='add-political-party-form-row'>
              <p>
                <label htmlFor="add-political-party-party-name">Party Name </label>
                <input id="add-political-party-party-name" type="text" placeholder="Party Name" value={partyName} onChange={handlePartyNameChange} />
              </p>
            </div>
            <div className='add-political-party-form-row'>
              <p>
                <label htmlFor="add-political-party-chairman-cnic">Chairman Cnic </label>
                <input id="add-political-party-chairman-cnic" type="text" placeholder="xxxxx-xxxxxxx-x" value={chairmanCnic} onChange={handleChairmanCnicChange} />
              </p>
            </div>

            <div className='add-political-party-form-row'>
              <p>
                <label htmlFor="add-political-party-postal-add">Postal Address </label>
                <input id="add-political-party-postal-add" type="text" placeholder="Postal Address" value={postalAdd} onChange={handlePostalAddChange} />
              </p>
            </div>
            <div className='add-political-party-form-row'>
              <p>
                <label htmlFor="add-political-party-alias">Alias </label>
                <input id="add-political-party-alias" type="text" placeholder="Example( PTI )" value={alias} onChange={handleAliasChange} />
              </p>
            </div>
            <div className='add-political-party-form-row' style={{ width: '100%' }}>
              <p style={{ display: 'flex' }}>
                <label htmlFor="add-political-party-candidates" style={{ alignSelf: 'center' }}>Candidates </label>
                {!csvData && (
                  <>
                    <button style={{ marginTop: '0px', marginRight: '0px', borderRadius: '3px', fontSize: 'small', padding: '8px 30px', backgroundColor: 'seagreen' }} onClick={handleCandidatesClick}>
                      Upload csv file
                    </button>
                    <input id="add-political-party-candidates getCandidatesFile" type="file" style={{ display: "none" }} ref={candidatesFileInputRef} onChange={handleCandidatesChange} />
                  </>
                )}
              </p>
            </div>
            <div style={{ marginRight: '10px', marginLeft: '10px' }}>
              {csvData && (
                <Table striped bordered hover>
                  <thead style={{ backgroundColor: "#0b4faf", color: "white" }}>
                    <tr>
                      <th style={{ textAlign: "center" }}>#</th>
                      {Object.keys(csvData[0]).map((key) => (
                        <th key={key} style={{ textAlign: "center" }}>
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {csvData.map((row, index) => (
                      <tr key={index}>
                        <td style={{ textAlign: "center" }}>{index + 1}.</td>
                        {Object.values(row).map((value, index) => (
                          <td style={{ textAlign: "center" }} key={index}>{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>

              )}
            </div>
            <p className='add-political-party-form-button'>
              <button className="add-political-party-btn" onClick={handleSubmit}>Add</button>
            </p>
          </div>

        </div>
      </main >
    </>
  );
}

export default AddPoliticalParty;