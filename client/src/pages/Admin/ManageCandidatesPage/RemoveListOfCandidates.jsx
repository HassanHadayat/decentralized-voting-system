import React, { useState, useRef, useEffect } from 'react';
import Web3 from "web3";
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import Papa from 'papaparse';
import Table from 'react-bootstrap/Table';
import Web3Converter from '../../../utils/Web3Converter';
import { Header, NotificationBox } from "../../../components/components";
import "../../../assets/styles/stylesheet.css";
import "../../../assets/styles/remove-list-of-candidates-page.css";
import { csvFileUploadIcon } from "../../../assets/images/images";

function AddListOfCandidates() {
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
    var cnicArr = [];

    for (let i = 0; i < csvData.length; i++) {
      cnicArr = [...cnicArr, Web3Converter.strToBytes16(csvData[i].cnic)];
    }
    await contracts.initialized[ContractName.ECP].contract.methods
      .removeCandidates(cnicArr)
      .send({ from: contracts.initialized[ContractName.ECP].accounts[0] });
    setShowNotification(true);
    setCsvData(null);

  //   const cands_count = await contracts.initialized[ContractName.ECP].contract.methods.candidates_count().call({ from: contracts.initialized[ContractName.ECP].accounts[0] });
  //   var cands_data = [];
  //   for (let i = 0; i < cands_count; i++) {
  //     var candidate_cnic = await contracts.initialized[ContractName.ECP].contract.methods.candidates_cnics(i).call({ from: contracts.initialized[ContractName.ECP].accounts[0] });
  //     const candidate_index = await contracts.initialized[ContractName.ECP].contract.methods.candidates_indexes(candidate_cnic).call({ from: contracts.initialized[ContractName.ECP].accounts[0] });
  //     const candidate = await contracts.initialized[ContractName.ECP].contract.methods.candidates(candidate_cnic).call({ from: contracts.initialized[ContractName.ECP].accounts[0] });
  //     candidate_cnic = Web3.utils.hexToUtf8(candidate_cnic);
  //     cands_data = [...cands_data, { candidate_cnic, candidate_index, candidate }];
  //   }
  //   console.log(cands_data); 
  };

  return (
    <>
      <Header isLanding={false} />

      <main className="remove-list-of-candidates-page-main theme-blue">
        {showNotification && <NotificationBox message="Candidates list added!" />}
        <h2>REMOVE LIST OF CANDIDATES</h2>
        <div className="wp-block-group">
          <div className="remove-list-of-candidates-form contact-form" id="remove-list-of-candidates-form">
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
              <button className="remove-list-of-candidates-btn" onClick={handleSubmit}>Add</button>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default AddListOfCandidates;