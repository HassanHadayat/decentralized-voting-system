import React, { useState, useRef, useEffect } from 'react';
import Web3 from "web3";
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import Papa from 'papaparse';
import Table from 'react-bootstrap/Table';
import Web3Converter from '../../../utils/Web3Converter';
import { Header, NotificationBox } from "../../../components/components";
import "../../../assets/styles/stylesheet.css";
import "../../../assets/styles/add-list-of-voters-page.css";
import { csvFileUploadIcon } from "../../../assets/images/images";

function AddListOfVoters() {
  // contracts.initialized
  const { state: contracts, } = useEth();

  const [csvFile, setCsvFile] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const hiddenFileInput = useRef(null);

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file.type === 'text/csv') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvData = event.target.result;
        const { data, errors } = Papa.parse(csvData, {
          header: true,
          complete: (results, file) => {
            console.log('CSV parsing complete:', results);
          },
          error: (error, file) => {
            console.error('CSV parsing error:', error);
          }
        });


        if (errors.length > 0) {
          alert('Failed to parse CSV file.');
        } else {
          setCsvData(data);
          setCsvFile(file);
        }
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a CSV file.');
    }
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
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
  };

  const handleSubmit = async () => {
    var csvDataBytes32 = [];
    for (let i = 0; i < csvData.length; i++) {
      const cnic = Web3Converter.strToBytes16(csvData[i].CNIC);
      const na = Web3Converter.strToBytes8(csvData[i].NA);
      const pa = Web3Converter.strToBytes8(csvData[i].PA);
      csvDataBytes32.push({ cnic, na, pa });
    }
    
    await contracts.initialized[ContractName.VoterManager].contract.methods
      .addVoterConstituencies(csvDataBytes32)
      .send({ from: contracts.initialized[ContractName.VoterManager].accounts[0]});
    // // ------------ TESTING -------------------//
    // const voters_count = await contracts.initialized[ContractName.VoterManager].contract.methods
    // .voters_count()
    // .call({ from: contracts.initialized[ContractName.VoterManager].accounts[0]});

    // for (let i = 0; i < voters_count; i++) {
    //   const voter = await contracts.initialized[ContractName.VoterManager].contract.methods
    //   .getVoterConstituency(i)
    //   .call({ from: contracts.initialized[ContractName.VoterManager].accounts[0]});  
    //   const VoterString = {cnic: Web3.utils.hexToUtf8(voter.cnic),
    //     na: Web3.utils.hexToUtf8(voter.na),
    //     pa: Web3.utils.hexToUtf8(voter.pa)};
    //     console.log(VoterString);
    // }

    setShowNotification(true);
    setCsvData(null);
  };

  return (
    <>
      <Header isLanding={false} />

      <main className="add-list-of-voters-page-main theme-blue">
        {showNotification && <NotificationBox message="Voters list added!" />}
        <h2>ADD LIST OF VOTERS</h2>
        <div className="wp-block-group">
          <div className="add-list-of-voters-form contact-form" id="add-list-of-voters-form">
            <div>
              <div className="file-upload-container" onDrop={handleFileDrop} onDragOver={(e) => e.preventDefault()}>
                <div className="file-upload-box">
                  {!csvData && (<>
                    <button className='file-upload-button' id='file-upload-button' onClick={handleClick}>
                      <img src={csvFileUploadIcon} />
                      <h2>Upload a CSV file</h2>
                    </button>
                    <input type="file"
                      ref={hiddenFileInput}
                      onChange={handleChange}
                      style={{ display: 'none' }}
                    />
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                  </>)}
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
              </div>
            </div>
            <p>
              <button className="add-list-of-voters-btn" onClick={handleSubmit}>Add</button>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default AddListOfVoters;