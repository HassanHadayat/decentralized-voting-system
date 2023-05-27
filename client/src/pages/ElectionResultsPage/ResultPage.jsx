import React, { useState, useRef, useEffect } from 'react';
import Chart from 'react-apexcharts'
import { Header } from "../../components/components";
import "../../assets/styles/stylesheet.css";
import "../../assets/styles/result-page.css";

function ResultPage() {
  const [series, setSeries] = useState([{
    data: [ 14, 4]
  },
  
  ]);
  const [options, setOptions] = useState(
    {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: ['Pakistan Tahreek-e-Insaf', 'Pakistan Muslim League (N)'],
      }
    },
  );



  return (
    <>
      <Header isLanding={false} />
      <main className="result-page-main post-611 page type-page status-publish hentry theme-blue">

        <h2>RESULT</h2>
        <div className="wp-block-group">
          <div
          style={{display:'flex', justifyContent:'space-between'}}>
            <div>
          <p><b>Election Name: </b> GE-23</p>
          <p><b>Start Date & Time: </b> May 29, 2023</p>
          <p><b>End Date & Time: </b> May 30, 2023</p>

            </div>
            <div>

          <p><b>Total Votes: </b> 20</p>
          <p><b>Votes Casted: </b> 18</p>
            </div>
          </div>
          <Chart options={options} series={series} type="bar" height={350} />
        </div>
      </main>
    </>
  );
}

export default ResultPage;
