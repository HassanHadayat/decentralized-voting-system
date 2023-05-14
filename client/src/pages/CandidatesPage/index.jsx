import React, { useState, useRef, useEffect } from 'react';
import { Header, Footer } from "../../components/components";
import { Container, Input, InputGroupText } from "reactstrap";
import { Table, InputGroup, FormControl } from 'react-bootstrap';
import "../../assets/styles/stylesheet.css";
import "../../assets/styles/candidates-page.css";



let CandidateItem = (props) => {
  const closedClassName = "accordion-section-header";
  const openClassName = "accordion-section-header open";
  const handleOpenChange = () => {
    props.setOpen(!props.isOpen);
  };

  return (
    <div className="wp-block-ctcl-election-website-accordion-section-block accordion-section-wrapper">

      <h2 className={props.isOpen ? openClassName : closedClassName}
        style={{ margin: '8px 0' }}>
        <span onClick={handleOpenChange} style={{ fontSize: (props.isOpen ? '32px' : '24px'), fontWeight: (props.isOpen ? 'bold' : 'normal') }}>{props.candidate.fullname}</span>
      </h2>
      <section className="candidate-item-content accordion-section-content">
        <p><b>Age:</b> {props.candidate.age}</p>
        <p><b>Gender:</b> {props.candidate.gender}</p>
        <p><b>Father Name:</b> {props.candidate.fathername}</p>
        <p><b>CNIC:</b> {props.candidate.cnic}</p>
        <p><b>Contact:</b> {props.candidate.contact}</p>
        <p><b>Permanent Address:</b> {props.candidate.permanent_add}</p>
        <p><b>Local Address:</b> {props.candidate.local_add}</p>
        <p><b>Province:</b> {props.candidate.province}</p>
        <p><b>Party:</b> {props.candidate.party}</p>
        <p><b>Constituencies:</b> {props.candidate.constituencies_list.length > 0 ? props.candidate.constituencies_list.map((constituency, index) => {
          return index === props.candidate.constituencies_list.length - 1 ? `${constituency}` : `${constituency}, `;
        }) : "None"}</p>

      </section>
    </div>
  );
};


function CandidatesPage() {
  const [candidatesList, setCandidatesList] = useState([
    { fullname: "Imran Khan", fathername: "Ikramullah Khan", age: 70, gender: "M", cnic: "35202-8940855-0", contact: "0323-5760200", permanent_add: "p26-Add", local_add: "l26-Add", province: "Khyber Pakhtunkhwa", constituencies_list: ["NA-1, PP-2"], party: "Pakistan Tehreek-e-Insaf" },
    { fullname: "Shahbaz Sharif", fathername: "Muhammad Sharif", age: 71, gender: "M", cnic: "35202-8940855-1", contact: "0323-5760201", permanent_add: "p27-Add", local_add: "l27-Add", province: "Punjab", constituencies_list: [], party: "Pakistan Muslim League (N)" },
  ]
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredCandidatesList = candidatesList.filter(candidate => {
    const query = searchQuery.toLowerCase();
    return candidate.fullname.toLowerCase().includes(query) || candidate.party.toLowerCase().includes(query) || candidate.province.toLowerCase().includes(query);
  });

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
      <main className="candidates-page-main post-425 page type-page status-publish hentry">
        <h1>Candidates</h1>
        {/* <p>You can find results on elections from 2005 to the present.</p> */}
        <InputGroup className="search-box">
          <InputGroupText className="search-icon">Search</InputGroupText>
          <Input placeholder="Search for a candidate..." onChange={handleSearch} />
        </InputGroup>
        <section className="wp-block-ctcl-election-website-accordion-group-block accordion-group">
          {filteredCandidatesList.map((candidate, index) => {
            const isOpen = index === openIndex;
            return (
              <CandidateItem
                key={candidate.cnic}
                candidate={candidate}
                isOpen={isOpen}
                setOpen={() => handleOpenChange(index)}
              ></CandidateItem>
            );
          })}
        </section>
        <p />
      </main>
    </>
  );
}

export default CandidatesPage;
