import React, { useState, useRef, useEffect } from 'react';
import Chart from 'react-apexcharts'
import { Header } from "../../components/components";
import "../../assets/styles/stylesheet.css";
import "../../assets/styles/result-page.css";

function ResultPage() {
  const [series, setSeries] = useState([{
    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
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
        categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
          'United States', 'China', 'Germany'
        ],
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

          <p><b>Total Votes: </b> 100</p>
          <p><b>Votes Casted: </b> 24</p>
            </div>
          </div>
          <Chart options={options} series={series} type="bar" height={350} />
        </div>
      </main>
    </>
  );
}

export default ResultPage;
