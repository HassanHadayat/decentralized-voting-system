import React, { useState } from "react";
import { Container, Input, InputGroup, InputGroupText, Table, Button } from "reactstrap";
import { Header } from "../../components/components";
import "../../assets/styles/polling-page.css"

const CANDIDATES = [
  { id: 1, party_alias: "PTI", party_name: "Pakistan Tahreek-e-Insaaf", cand_name: "Imran Khan" },
  { id: 2, party_alias: "PML-N", party_name: "Pakistan Muslim League Nawaz", cand_name: "Shehbaz Sharif" },

];

const PollingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleCandidateSelect = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCandidates = CANDIDATES.filter(
    (c) =>
      c.cand_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.party_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.party_alias.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = () => {
    console.log("Selected Candidate:", selectedCandidate);
  };

  return (
    <>
      <Header isLanding={false} />

      <main className="polling-page-main theme-blue">
        <Container>
          <div className="polling-name-row">
            <h1 className="my-4">General Elections 2023</h1>
            <Button className="mt-5"
              style={{ height: 'max-content', marginRight: '0px', borderRadius: '3px', fontWeight: '600', fontSize: 'medium', padding: '8px 30px', backgroundColor: 'seagreen' }}
              onClick={handleSubmit} disabled={!selectedCandidate}>
              Submit Vote
            </Button>
          </div>
          <div className="wp-block-group" style={{paddingTop:'30px', paddingBottom:'10px'}}>
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
            {/* <thead> */}
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
