import React, { useState, useRef, useEffect } from 'react';
import Web3 from "web3";
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import Papa from 'papaparse';
import Table from 'react-bootstrap/Table';
import { Header, NotificationBox } from "../../../components/components";
import "../../../assets/styles/stylesheet.css";
import "../../../assets/styles/add-list-of-candidates-page.css";
import { csvFileUploadIcon } from "../../../assets/images/images";

function AddListOfCandidates() {
  // initializedContracts
  const { state: initializedContracts, } = useEth();

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

  const web3StringToBytes32 = (str) => {
    var result = Web3.utils.asciiToHex(str);
    while (result.length < 66) { result += '0'; }
    if (result.length !== 66) { throw new Error("invalid web3 implicit bytes32"); }
    return result;
  };

  const handleSubmit = async () => {
    var fullnameArr = [], ageArr = [], genderArr = [], cnicArr = [], contactArr = [], father_nameArr = [], permanent_addArr = [], local_addArr = [], provinceArr = [];

    for (let i = 0; i < csvData.length; i++) {
      const cand = {
        fullname: web3StringToBytes32(csvData[i].fullName),
        age: parseInt(csvData[i].age),
        gender: web3StringToBytes32(csvData[i].gender),
        cnic: web3StringToBytes32(csvData[i].cnic),
        contact: web3StringToBytes32(csvData[i].contact),
        father_name: web3StringToBytes32(csvData[i].fatherName),
        permanent_add: web3StringToBytes32(csvData[i].permanentAdd),
        local_add: web3StringToBytes32(csvData[i].localAdd),
        province: web3StringToBytes32(csvData[i].province)
      }
      fullnameArr = [...fullnameArr, cand.fullname];
      ageArr = [...ageArr, cand.age];
      genderArr = [...genderArr, cand.gender];
      cnicArr = [...cnicArr, cand.cnic];
      contactArr = [...contactArr, cand.contact];
      father_nameArr = [...father_nameArr, cand.father_name];
      permanent_addArr = [...permanent_addArr, cand.permanent_add];
      local_addArr = [...local_addArr, cand.local_add];
      provinceArr = [...provinceArr, cand.province];
    }
    console.log(fullnameArr);
    console.log(ageArr);
    console.log(genderArr);
    console.log(cnicArr);
    console.log(contactArr);
    console.log(father_nameArr);
    console.log(permanent_addArr);
    console.log(local_addArr);
    console.log(provinceArr);
    await initializedContracts[ContractName.ECP].contract.methods
      .addCandidates(fullnameArr, ageArr, genderArr, cnicArr, contactArr, father_nameArr, permanent_addArr, local_addArr, provinceArr)
      .send({ from: initializedContracts[ContractName.ECP].accounts[0] });
    setShowNotification(true);
    setCsvData(null);

    const cands_count = await initializedContracts[ContractName.ECP].contract.methods.candidates_count().call({ from: initializedContracts[ContractName.ECP].accounts[0] });
    var cands_data = [];
    for (let i = 0; i < cands_count; i++) {
      var candidate_cnic = await initializedContracts[ContractName.ECP].contract.methods.candidates_cnics(i).call({ from: initializedContracts[ContractName.ECP].accounts[0] });
      const candidate_index = await initializedContracts[ContractName.ECP].contract.methods.candidates_indexes(candidate_cnic).call({ from: initializedContracts[ContractName.ECP].accounts[0] });
      const candidate = await initializedContracts[ContractName.ECP].contract.methods.candidates(candidate_cnic).call({ from: initializedContracts[ContractName.ECP].accounts[0] });
      candidate_cnic = Web3.utils.hexToUtf8(candidate_cnic);
      cands_data = [...cands_data, { candidate_cnic, candidate_index, candidate }];
    }
    console.log(cands_data);
  };

  return (
    <>
      <Header isLanding={false} />

      <main className="add-list-of-candidates-page-main theme-blue">
        {showNotification && <NotificationBox message="Candidates list added!" />}
        <h2>ADD LIST OF CANDIDATES</h2>
        <div className="wp-block-group">
          <div className="add-list-of-candidates-form contact-form" id="add-list-of-candidates-form">
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
              <button className="add-list-of-candidates-btn" onClick={handleSubmit}>Add</button>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default AddListOfCandidates;