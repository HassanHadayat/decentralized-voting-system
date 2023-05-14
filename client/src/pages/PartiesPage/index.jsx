import React, { useState } from 'react';
import { Container, Input, InputGroupText } from "reactstrap";
import { Table, InputGroup, FormControl } from 'react-bootstrap';

import { Header } from "../../components/components";
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
      <Table striped bordered hover responsive style={{textAlign:'center'}}>
        
        <thead style={{ backgroundColor: "#0b4faf", color: "white" }}>
          <tr>
            <th style={{width:'50px'}}>Constituency</th>
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
        <span onClick={handleOpenChange} style={{ fontWeight: (props.isOpen? 'bold':'normal') }}>{props.party.name}</span>
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
              <FormControl style={{ height: 'auto', fontSize: '1.6rem' }} onChange={handleSearch} placeholder="Search by name or constituency" />
            </InputGroup>
            {renderCandidateTable(props.party.na_cands_list)}

          </div>
          <div className='party-candidates-div'>
            <p><b>List of PA Candidates:</b></p>
            <InputGroup className="mb-3" style={{ height: '30px' }}>
              <InputGroup.Text style={{ fontSize: '1.6rem' }}>Search</InputGroup.Text>
              <FormControl style={{ height: 'auto', fontSize: '1.6rem' }} onChange={handleSearch} placeholder="Search by name or constituency" />
            </InputGroup>
            {renderCandidateTable(props.party.pa_cands_list)}
          </div>

        </div>
      </section>

    </div>
  );
};


function PartiesPage() {
  const [partiesList, setPartiesList] = useState([
    {
      name: "Pakistan Tehreek-e-Insaf", chairmanName: "Imran Khan", chairmanCnic: "35202-8940855-0", postal_add: "postal-pti", _alias: "PTI"
      , na_cands_list: [{ name: "Fawad Chauhdry", constituency: "NA-1" }, { name: "Shah Mehmood", constituency: "NA-2" }]
      , pa_cands_list: [{ name: "Buzdar Don", constituency: "PP-1" }, { name: "Shafqat Mehmood", constituency: "PP-2" }]
    },
    {
      name: "Pakistan Muslim League (N)", chairmanName: "Shehbaz Sharif", chairmanCnic: "35202-8940855-1", postal_add: "postal-pmln", _alias: "PML-N"
      , na_cands_list: [], pa_cands_list: []
    },
  ]);

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

  return (
    <>
      <Header />
      <main className="parties-page-main post-425 page type-page status-publish hentry">
        <h1>Politiacal Parties</h1>
        <InputGroup className="search-box">
          <InputGroupText className="search-icon">Search</InputGroupText>
          <Input placeholder="Search for a candidate or party..." onChange={handleSearch} />
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
