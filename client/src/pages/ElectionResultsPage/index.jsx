import React, { useState, useRef, useEffect } from 'react';
import Web3 from "web3";
import { useEth } from "../../contexts/contexts";
import { ContractName } from "../../contexts/EthContext/ContractName";
import { Header, Footer } from "../../components/components";
import Web3Converter from '../../utils/Web3Converter';
import "../../assets/styles/stylesheet.css";



let ElectionResultBtn = (props) => {
  const closedClassName = "accordion-section-header";
  const openClassName = "accordion-section-header open";
  const handleOpenChange = () => {
    props.setOpen(!props.isOpen);
  };

  return (
    <div className="wp-block-ctcl-election-website-accordion-section-block accordion-section-wrapper">

      <h2 className={props.isOpen ? openClassName : closedClassName}>
        <span onClick={handleOpenChange}>{props.resultName}</span>
      </h2>
      <section className="accordion-section-content">
        <h3 className="wp-block-heading">{props.resultDate}</h3>
        {props.resultIsCE && <p>
          <a href="/" target="_blank" rel="noreferrer noopener">Stats of your Constituencies Result</a>
        </p>}
        {props.resultIsPE && <p>
          <a href="/" target="_blank" rel="noreferrer noopener">Stats of Provicial Election Results</a>
        </p>}
        {props.resultIsGE && <p>
          <a href="/" target="_blank" rel="noreferrer noopener">Stats of Overall Result</a>
        </p>}
      </section>
    </div>
  );
};


function ElectionResultsPage() {
  const { state: contracts, } = useEth();
  const [resultsList, setResultsList] = useState([
    { name: "General Elections 2023", date: "Oct 14, 2023", isCE: true, isPE: true, isGE: true },
    { name: "Provincial Elections 2023", date: "April 14, 2023", isCE: true, isPE: true, isGE: false },
    { name: "Constituency Election 2023", date: "June 28, 2023", isCE: true, isPE: false, isGE: false }]
  );
  const [isLoaded, setIsLoaded] = useState(false);

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
      <main className="election-results-page-main post-425 page type-page status-publish hentry">
        <h1>Election Results</h1>
        <p>You can find results on elections from 2005 to the present.</p>
        <section className="wp-block-ctcl-election-website-accordion-group-block accordion-group">
          {resultsList.map((result, index) => {
            const isOpen = index === openIndex;
            return (
              <ElectionResultBtn
                key={result.name}
                resultName={result.name}
                resultDate={result.date}
                resultIsCE={result.isCE}
                resultIsPE={result.isPE}
                resultIsGE={result.isGE}
                isOpen={isOpen}
                setOpen={() => handleOpenChange(index)}
              ></ElectionResultBtn>
            );
          })}
        </section>
        <p />
      </main>
    </>
  );
}

export default ElectionResultsPage;
