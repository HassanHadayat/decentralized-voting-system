import React, { useState, useRef, useEffect } from 'react';
import Web3 from "web3";
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import Papa from 'papaparse';
import Table from 'react-bootstrap/Table';
import { Header, NotificationBox } from "../../../components/components";
import Web3Converter from '../../../utils/Web3Converter';
import "../../../assets/styles/stylesheet.css";
import "../../../assets/styles/add-list-of-candidates-page.css";
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
    var fullnameArr = [], ageArr = [], genderArr = [], cnicArr = [], contactArr = [], father_nameArr = [], permanent_addArr = [], local_addArr = [], provinceArr = [];

    for (let i = 0; i < csvData.length; i++) {
      const cand = {
        fullname: Web3Converter.strToBytes32(csvData[i].Full_Name),
        age: parseInt(csvData[i].Age),
        gender: Web3Converter.strToBytes1(csvData[i].Gender),
        cnic: Web3Converter.strToBytes16(csvData[i].CNIC),
        contact: Web3Converter.strToBytes12(csvData[i].Contact),
        father_name: Web3Converter.strToBytes32(csvData[i].Father_Name),
        permanent_add: Web3Converter.strToBytes32(csvData[i].Permanent_Address),
        local_add: Web3Converter.strToBytes32(csvData[i].Local_Address),
        province: Web3Converter.strToBytes32(csvData[i].Province)
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

    await contracts.initialized[ContractName.CandidateManager].contract.methods
      .addCandidates(fullnameArr, ageArr, genderArr, cnicArr, contactArr, father_nameArr, permanent_addArr, local_addArr, provinceArr)
      .send({ from: contracts.initialized[ContractName.CandidateManager].accounts[0] });


    //------------------------------- TESTING ----------------------------------------------        
    const cands_count = await contracts.initialized[ContractName.CandidateManager].contract.methods
      .candidates_count()
      .call({ from: contracts.initialized[ContractName.CandidateManager].accounts[0] });
    console.log(cands_count);

    for (let i = 0; i < cands_count; i++) {
      const candAdd = await contracts.initialized[ContractName.CandidateManager].contract.methods
        .getCandidate(i)
        .call({ from: contracts.initialized[ContractName.CandidateManager].accounts[0] });

      console.log(candAdd);

      try {
        const candContract = new contracts.uninitialized[ContractName.Candidate].web3.eth
          .Contract(contracts.uninitialized[ContractName.Candidate].artifact.abi, candAdd);
        const cand = {
          fullname: Web3.utils.hexToUtf8(await candContract.methods.fullname().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
          , age: await candContract.methods.age().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] })
          , gender: Web3.utils.hexToUtf8(await candContract.methods.gender().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
          , cnic: Web3.utils.hexToUtf8(await candContract.methods.cnic().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
          , contact: Web3.utils.hexToUtf8(await candContract.methods.contact().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
          , father_name: Web3.utils.hexToUtf8(await candContract.methods.father_name().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
          , pAdd: Web3.utils.hexToUtf8(await candContract.methods.permanent_add().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
          , lAdd: Web3.utils.hexToUtf8(await candContract.methods.local_add().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
          , province: Web3.utils.hexToUtf8(await candContract.methods.province().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
          , party: Web3.utils.hexToUtf8(await candContract.methods.party().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
        };

        console.log(cand);
      }
      catch (err) {
        console.log(err);
      }
    }




    setShowNotification(true);
    setCsvData(null);
  };

  return (
    <>
      <Header isLanding={false} />

      <main className="add-list-of-candidates-page-main theme-blue"
        style={csvData ? { width: '90vw' } : { width: '460px' }}>
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