import React, { useState, useRef, useEffect } from 'react';
import Papa from 'papaparse';
import Table from 'react-bootstrap/Table';
import Web3 from "web3";
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import { Header, NotificationBox } from "../../../components/components";
import "../../../assets/styles/stylesheet.css";
import "../../../assets/styles/add-political-party-page.css";

function AddPoliticalParty() {
  // initializedContracts
  const { state: initializedContracts, } = useEth();

  const [partyName, setPartyName] = useState("");
  const [chairmanCnic, setChairmanCnic] = useState("");
  const [postalAdd, setPostalAdd] = useState("");
  const [alias, setAlias] = useState("");
  // const [candsCnics, setCandsCnics] = useState([]);
  // const [candsConstituencies, setCandsConstituencies] = useState([]);

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
  const web3StringToBytes32 = (str) => {
    var result = Web3.utils.asciiToHex(str);
    while (result.length < 66) { result += '0'; }
    if (result.length !== 66) { throw new Error("invalid web3 implicit bytes32"); }
    return result;
  };

  const handleSubmit = async () => {
    if (false) {
      alert('Input feilds incorrect!');
    }
    else {
      var _party_cands = [];
      var _party_cands_constituencies=[];

      csvData.forEach(cand => {
        _party_cands.push(web3StringToBytes32(cand.CNIC));
        _party_cands_constituencies.push(web3StringToBytes32(cand.Constituency));
      });

      const party = {
        name: web3StringToBytes32(partyName),
        chairman_cnic: web3StringToBytes32(chairmanCnic),
        postal_add: web3StringToBytes32(postalAdd),
        _alias: web3StringToBytes32(alias)
      }
      await initializedContracts[ContractName.ECP].contract.methods
        .addParty(
          party.name, party.chairman_cnic, party.postal_add, party._alias,
          _party_cands, _party_cands_constituencies
        )
        .send({ from: initializedContracts[ContractName.ECP].accounts[0] });

      setShowNotification(true);
      
      setPartyName('');
      setChairmanCnic('');
      setPostalAdd('');
      setAlias('');
      setCsvData(null);

      // const voters_count = await initializedContracts[ContractName.ECP].contract.methods.voters_count().call({ from: initializedContracts[ContractName.ECP].accounts[0] });
      // var voter_constituency_data = [];
      // for (let i = 0; i < voters_count; i++) {
      //   var voter_cnic = await initializedContracts[ContractName.ECP].contract.methods.voters_cnics(i).call({ from: initializedContracts[ContractName.ECP].accounts[0] });
      //   const voter_index = await initializedContracts[ContractName.ECP].contract.methods.voters_indexes(voter_cnic).call({ from: initializedContracts[ContractName.ECP].accounts[0] });
      //   const voter = await initializedContracts[ContractName.ECP].contract.methods.voters(voter_cnic).call({ from: initializedContracts[ContractName.ECP].accounts[0] });
      //   voter_cnic = Web3.utils.hexToUtf8(voter_cnic);
      //   voter_constituency_data = [...voter_constituency_data, { voter_cnic, voter_index, voter }];
      // }
      // console.log(voter_constituency_data);
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
            <div style={{marginRight:'10px', marginLeft:'10px'}}>
              {csvData && (
                <Table striped bordered hover>
                  <thead style={{ backgroundColor: "#0b4faf", color: "white" }}>
                    <tr>
                      <th>#</th>
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
                        <td>{index + 1}.</td>
                        {Object.values(row).map((value, index) => (
                          <td key={index}>{value}</td>
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