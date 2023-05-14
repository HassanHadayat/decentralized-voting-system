import React from "react";
import { Header, Footer } from "../../components/components";
import "../../assets/styles/stylesheet.css";

function HomePage() {
  return (
    <>
      <Header />
      <main className="post-611 page type-page status-publish hentry theme-blue">

        {true && (
          <>
            <h2>ADMIN</h2>
            <div className="wp-block-group wp-block-ctcl-election-website-tile-nav-section-block tile-wrapper">
              <a
                href="/manage-elections"
                className="tile"
              >
                <img decoding="async" width={50} height={50} alt=""
                  src="data:image/svg+xml,%3Csvg%20width=%2251%22%20height=%2250%22%20viewBox=%220%200%2051%2050%22%20fill=%22none%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d=%22M9.417%208.971v-.333l-.2-.267-2.623-3.499.27-1.624h28.222a4%204%200%20014%204v40.1H9.416V8.971z%22%20fill=%22%23fff%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20d=%22M17.505%2042.586l-3.33-3.362%201.344-1.354%201.986%201.998%204.923-4.966%201.344%201.355-6.267%206.329z%22%20fill=%22%23004CB3%22/%3E%3Cpath%20d=%22M9.39%206.643v8.051H2.6v-8.05a3.395%203.395%200%20116.79%200z%22%20fill=%22%23D7D8E0%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20fill=%22%23004CB3%22%20d=%22M25.691%2038.744h8.637v1.921h-8.637zm-11.516-8.643h20.153v1.921H14.175zm0-4.803h20.153v1.921H14.175zm0-4.802h20.153v1.921H14.175zm0-4.802h20.153v1.921H14.175zm0-4.802h20.153v1.921H14.175z%22/%3E%3Cpath%20fill=%22%2355D5F1%22%20stroke=%22%23192754%22%20stroke-width=%222%22%20d=%22M44.925%2010.932h4.718v25.852h-4.718z%22/%3E%3Cpath%20d=%22M44.925%2036.863h4.718v4.42l-2.36%203.035-2.358-3.036v-4.42z%22%20fill=%22%23fff%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20d=%22M49.642%208.488v3.325h-4.717V8.488a2.359%202.359%200%20014.718%200z%22%20fill=%22%23EE5C4A%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3C/svg%3E"
                />
                <label>Manage Elections</label>
              </a>
              <a
                href="/manage-voters"
                className="tile"
              >
                <img decoding="async" width={50} height={50} alt=""
                  src="data:image/svg+xml,%3Csvg%20width=%2251%22%20height=%2250%22%20viewBox=%220%200%2051%2050%22%20fill=%22none%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d=%22M9.417%208.971v-.333l-.2-.267-2.623-3.499.27-1.624h28.222a4%204%200%20014%204v40.1H9.416V8.971z%22%20fill=%22%23fff%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20d=%22M17.505%2042.586l-3.33-3.362%201.344-1.354%201.986%201.998%204.923-4.966%201.344%201.355-6.267%206.329z%22%20fill=%22%23004CB3%22/%3E%3Cpath%20d=%22M9.39%206.643v8.051H2.6v-8.05a3.395%203.395%200%20116.79%200z%22%20fill=%22%23D7D8E0%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20fill=%22%23004CB3%22%20d=%22M25.691%2038.744h8.637v1.921h-8.637zm-11.516-8.643h20.153v1.921H14.175zm0-4.803h20.153v1.921H14.175zm0-4.802h20.153v1.921H14.175zm0-4.802h20.153v1.921H14.175zm0-4.802h20.153v1.921H14.175z%22/%3E%3Cpath%20fill=%22%2355D5F1%22%20stroke=%22%23192754%22%20stroke-width=%222%22%20d=%22M44.925%2010.932h4.718v25.852h-4.718z%22/%3E%3Cpath%20d=%22M44.925%2036.863h4.718v4.42l-2.36%203.035-2.358-3.036v-4.42z%22%20fill=%22%23fff%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20d=%22M49.642%208.488v3.325h-4.717V8.488a2.359%202.359%200%20014.718%200z%22%20fill=%22%23EE5C4A%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3C/svg%3E"
                />
                <label>Manage Voters</label>
              </a>
              <a
                href="/manage-candidates"
                className="tile"
              >
                <img
                  decoding="async" width={50} height={50} alt=""
                  src="data:image/svg+xml,%3Csvg%20width=%2250%22%20height=%2249%22%20viewBox=%220%200%2050%2049%22%20fill=%22none%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d=%22M48.944%2017.183v29.819H2.041v-29.82L25.492%201.21l23.451%2015.973z%22%20fill=%22%2355D5F1%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20d=%22M7.91%206.878h35.165v14.689L25.493%2032.14%207.91%2021.567V6.877z%22%20fill=%22%23fff%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20fill=%22%23004CB3%22%20d=%22M21.7%2010.776h16.627v1.959H21.7zm0%204.898h16.627v1.959H21.7zm0%204.898h16.627v1.959H21.7zm0%204.898h12.943l-3.274%201.96H21.7v-1.96z%22/%3E%3Cpath%20fill=%22%23EE5C4A%22%20stroke=%22%23EE5C4A%22%20stroke-width=%222%22%20d=%22M12.8%2011.776h4.846v4.857H12.8z%22/%3E%3Cpath%20d=%22M12.8%2021.572h4.846v5.858H12.8v-5.858z%22%20fill=%22%23D8DAE2%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20d=%22M24.977%2032.205l.516.31.515-.31%2022.936-13.784v26.58a2%202%200%2001-2%202H2.041v-28.58l22.935%2013.784z%22%20fill=%22%23F4F6FF%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20d=%22M48.965%2018.123L2.51%2046.533m45.967%200L1.531%2018.122%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3C/svg%3E"
                />
                <label>Manage Candidates</label>
              </a>
              <a
                href="/manage-political-parties"
                className="tile"
              >
                <img
                  decoding="async" width={50} height={50} alt=""
                  src="data:image/svg+xml,%3Csvg%20width=%2250%22%20height=%2249%22%20viewBox=%220%200%2050%2049%22%20fill=%22none%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d=%22M48.944%2017.183v29.819H2.041v-29.82L25.492%201.21l23.451%2015.973z%22%20fill=%22%2355D5F1%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20d=%22M7.91%206.878h35.165v14.689L25.493%2032.14%207.91%2021.567V6.877z%22%20fill=%22%23fff%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20fill=%22%23004CB3%22%20d=%22M21.7%2010.776h16.627v1.959H21.7zm0%204.898h16.627v1.959H21.7zm0%204.898h16.627v1.959H21.7zm0%204.898h12.943l-3.274%201.96H21.7v-1.96z%22/%3E%3Cpath%20fill=%22%23EE5C4A%22%20stroke=%22%23EE5C4A%22%20stroke-width=%222%22%20d=%22M12.8%2011.776h4.846v4.857H12.8z%22/%3E%3Cpath%20d=%22M12.8%2021.572h4.846v5.858H12.8v-5.858z%22%20fill=%22%23D8DAE2%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20d=%22M24.977%2032.205l.516.31.515-.31%2022.936-13.784v26.58a2%202%200%2001-2%202H2.041v-28.58l22.935%2013.784z%22%20fill=%22%23F4F6FF%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20d=%22M48.965%2018.123L2.51%2046.533m45.967%200L1.531%2018.122%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3C/svg%3E"
                />
                <label>Manage Political Parties</label>
              </a>
            </div>
            <div className="wp-block-group"></div>
          </>
        )}

        <div className="wp-block-ctcl-election-website-tile-nav-section-block tile-wrapper"
        >
          <a
            href="/elections"
            className="tile"
          >
            <img decoding="async" width={50} height={50} alt=""
              src="data:image/svg+xml,%3Csvg%20width=%2251%22%20height=%2250%22%20viewBox=%220%200%2051%2050%22%20fill=%22none%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d=%22M9.417%208.971v-.333l-.2-.267-2.623-3.499.27-1.624h28.222a4%204%200%20014%204v40.1H9.416V8.971z%22%20fill=%22%23fff%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20d=%22M17.505%2042.586l-3.33-3.362%201.344-1.354%201.986%201.998%204.923-4.966%201.344%201.355-6.267%206.329z%22%20fill=%22%23004CB3%22/%3E%3Cpath%20d=%22M9.39%206.643v8.051H2.6v-8.05a3.395%203.395%200%20116.79%200z%22%20fill=%22%23D7D8E0%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20fill=%22%23004CB3%22%20d=%22M25.691%2038.744h8.637v1.921h-8.637zm-11.516-8.643h20.153v1.921H14.175zm0-4.803h20.153v1.921H14.175zm0-4.802h20.153v1.921H14.175zm0-4.802h20.153v1.921H14.175zm0-4.802h20.153v1.921H14.175z%22/%3E%3Cpath%20fill=%22%2355D5F1%22%20stroke=%22%23192754%22%20stroke-width=%222%22%20d=%22M44.925%2010.932h4.718v25.852h-4.718z%22/%3E%3Cpath%20d=%22M44.925%2036.863h4.718v4.42l-2.36%203.035-2.358-3.036v-4.42z%22%20fill=%22%23fff%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20d=%22M49.642%208.488v3.325h-4.717V8.488a2.359%202.359%200%20014.718%200z%22%20fill=%22%23EE5C4A%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3C/svg%3E"
            />
            <label>Cast Vote</label>
          </a>
          <a
            // href="https://electionwebsitetemplate.org/results/"
            href="/election-results"
            className="tile"
          >
            <img
              decoding="async" width={50} height={50} alt=""
              src="data:image/svg+xml,%3Csvg%20width=%2250%22%20height=%2250%22%20viewBox=%220%200%2050%2050%22%20fill=%22none%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cmask%20id=%22a%22%20fill=%22%23fff%22%3E%3Crect%20x=%221%22%20y=%221%22%20width=%2248%22%20height=%2235%22%20rx=%221%22/%3E%3C/mask%3E%3Crect%20x=%221%22%20y=%221%22%20width=%2248%22%20height=%2235%22%20rx=%221%22%20fill=%22%23fff%22%20stroke=%22%23192754%22%20stroke-width=%224%22%20mask=%22url%28%23a%29%22/%3E%3Cpath%20d=%22M23.503%2018.584c0%204.235-3.43%207.667-7.66%207.667s-7.661-3.432-7.661-7.667c0-4.236%203.43-7.668%207.66-7.668s7.661%203.432%207.661%207.668z%22%20fill=%22%2355D5F1%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20fill=%22%23004CB3%22%20d=%22M27.751%2018.584h3.248v8.668h-3.248zM34%2014.25h3.248v13.002H34zm6-4.334h3.248v17.335H40z%22/%3E%3Cpath%20d=%22M23.22%2015.343c.945%202.208.621%204.839.306%206.33-.13.62-.82.889-1.369.57l-5.815-3.374a1%201%200%2001-.498-.865v-7.092c0-.552.451-1.005.993-.895%202.485.508%205.291%202.777%206.383%205.326z%22%20fill=%22%23EE5C4A%22/%3E%3Cpath%20d=%22M8.823%2016.076c-.939%202.191-.627%204.057-.314%205.059.146.467.652.666%201.113.503l5.91-2.09a1%201%200%2000.667-.943v-6.96c0-.553-.452-1.005-.993-.895-2.485.508-5.292%202.776-6.383%205.326z%22%20fill=%22%23D7D8E0%22/%3E%3Cpath%20d=%22M23.505%2018.58c0%204.235-3.43%207.667-7.66%207.667a7.665%207.665%200%2001-7.662-7.668%207.664%207.664%200%20017.661-7.667%207.664%207.664%200%20017.661%207.667z%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20d=%22M15.842%2011v6.99a1%201%200%2000.521.878l5.434%202.966m-5.955-3.25l-7.037%202.708m14.992%2018.902l-8.15%208.157m8.151-12.995v5.059l8.63%207.936%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3C/svg%3E"
            />
            <label>View Election Results</label>
          </a>
          <a
            href="/parties"
            className="tile"
          >
            <img
              decoding="async"
              width={50}
              height={50}
              alt=""
              src="data:image/svg+xml,%3Csvg%20width=%2250%22%20height=%2250%22%20viewBox=%220%200%2050%2050%22%20fill=%22none%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d=%22M7%207.667h36.519v40.37H7V7.667z%22%20fill=%22%23fff%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20fill=%22%23004CB3%22%20d=%22M24.275%2014.854h13.562v2H24.275zm0%203.619h13.562v2H24.275zm0%207.144h13.562v2H24.275zm0%2010.763h13.562v2H24.275zm0-7.144h13.562v2H24.275zm0%2010.763h13.562v2H24.275z%22/%3E%3Cpath%20fill=%22%23EE5C4A%22%20stroke=%22%23192754%22%20stroke-width=%222%22%20d=%22M12.617%2014.949h6.137v6.144h-6.137z%22/%3E%3Cpath%20fill=%22%23D7D8E0%22%20stroke=%22%23192754%22%20stroke-width=%222%22%20d=%22M12.617%2025.712h6.137v6.144h-6.137zm0%2010.763h6.137v6.144h-6.137z%22/%3E%3Cmask%20id=%22a%22%20fill=%22%23fff%22%3E%3Cpath%20fill-rule=%22evenodd%22%20clip-rule=%22evenodd%22%20d=%22M29.42%203.959H31a3%203%200%20013%203v4.239H16.358v-4.24a3%203%200%20013-3h1.58a4.314%204.314%200%20018.481%200z%22/%3E%3C/mask%3E%3Cpath%20fill-rule=%22evenodd%22%20clip-rule=%22evenodd%22%20d=%22M29.42%203.959H31a3%203%200%20013%203v4.239H16.358v-4.24a3%203%200%20013-3h1.58a4.314%204.314%200%20018.481%200z%22%20fill=%22%23D7D8E0%22/%3E%3Cpath%20d=%22M29.42%203.959l-1.967.363.302%201.637h1.664v-2zM34%2011.197v2h2v-2h-2zm-17.642%200h-2v2h2v-2zm4.58-7.238v2h1.665l.302-1.637-1.967-.363zm8.481%202H31v-4h-1.58v4zm1.581%200a1%201%200%20011%201h4a5%205%200%2000-5-5v4zm1%201v4.239h4v-4.24h-4zm2%202.238H16.358v4H34v-4zm-15.642%202V6.96h-4v4.239h4zm0-4.238a1%201%200%20011-1v-4a5%205%200%2000-5%205h4zm1-1h1.58v-4h-1.58v4zm3.547-1.637a2.314%202.314%200%20012.274-1.887v-4a6.314%206.314%200%2000-6.208%205.16l3.934.727zm2.274-1.887c1.13%200%202.075.813%202.274%201.887l3.933-.727a6.314%206.314%200%2000-6.207-5.16v4z%22%20fill=%22%23192754%22%20mask=%22url%28%23a%29%22/%3E%3C/svg%3E"
            />
            <label>View Parties</label>
          </a>
          <a
            href="/candidates"
            className="tile"
          >
            <img
              decoding="async"
              width={50}
              height={50}
              alt=""
              src="data:image/svg+xml,%3Csvg%20width=%2250%22%20height=%2250%22%20viewBox=%220%200%2050%2050%22%20fill=%22none%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d=%22M9%2012.055h32.98v36.69H9v-36.69z%22%20fill=%22%23F4F6FF%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20fill=%22%2355D5F1%22%20stroke=%22%23192754%22%20stroke-width=%222%22%20d=%22M22.808%2036.928h6.285v11.818h-6.285z%22/%3E%3Cpath%20d=%22M25%201h8.158l2.444%202.5L33.158%206H25V1z%22%20fill=%22%23EE5C4A%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20fill=%22%23D7D8E0%22%20stroke=%22%23192754%22%20stroke-width=%222%22%20d=%22M14%2017.582h4.444v4.449H14zm0%2010.133h4.444v4.449H14zm0%209.213h4.444v4.449H14zm9.728-19.346h4.444v4.449h-4.444zm9.205%200h4.444v4.449h-4.444zm0%2010.133h4.444v4.449h-4.444zm0%209.213h4.444v4.449h-4.444zm-9.205-9.213h4.444v4.449h-4.444z%22/%3E%3Cpath%20fill=%22%23192754%22%20d=%22M24%202h2v10h-2z%22/%3E%3C/svg%3E"
            />
            <label>View Candidates</label>
          </a>
          <a
            href="https://electionwebsitetemplate.org/resources-for-candidates/"
            className="tile"
          >
            <img
              decoding="async"
              width={50}
              height={50}
              alt=""
              src="data:image/svg+xml,%3Csvg%20width=%2250%22%20height=%2251%22%20viewBox=%220%200%2050%2051%22%20fill=%22none%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d=%22M12.633%2045.786v-21.52h4.43v21.52a2.214%202.214%200%2001-4.43%200z%22%20fill=%22%23FF8374%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20d=%22M19.584%2010.333L40.06%201.52v37.065L19.584%2029.77V10.333z%22%20fill=%22%23F4F6FF%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cmask%20id=%22a%22%20fill=%22%23fff%22%3E%3Crect%20x=%228.878%22%20y=%229.07%22%20width=%2211.939%22%20height=%2222.058%22%20rx=%221%22/%3E%3C/mask%3E%3Crect%20x=%228.878%22%20y=%229.07%22%20width=%2211.939%22%20height=%2222.058%22%20rx=%221%22%20fill=%22%23D7D8E0%22%20stroke=%22%23192754%22%20stroke-width=%224%22%20mask=%22url%28%23a%29%22/%3E%3Cmask%20id=%22b%22%20fill=%22%23fff%22%3E%3Crect%20x=%225.205%22%20y=%2211.827%22%20width=%225.51%22%20height=%2216.544%22%20rx=%221%22/%3E%3C/mask%3E%3Crect%20x=%225.205%22%20y=%2211.827%22%20width=%225.51%22%20height=%2216.544%22%20rx=%221%22%20fill=%22%23D7D8E0%22%20stroke=%22%23192754%22%20stroke-width=%224%22%20mask=%22url%28%23b%29%22/%3E%3Cpath%20d=%22M4.949%2016.487H6.04v7.224H4.949a3.612%203.612%200%20010-7.224z%22%20fill=%22%2355D5F1%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20d=%22M43.1%2021.018h6.36m-6.444-3.56l5.887-2.813m-5.887%209.93l5.887%202.813%22%20stroke=%22%23004CB3%22%20stroke-width=%222%22/%3E%3C/svg%3E"
            />
            <label>News Updates</label>
          </a>
        </div>

      </main>

      {/* <Footer/> */}
    </>
  );
}

export default HomePage;
