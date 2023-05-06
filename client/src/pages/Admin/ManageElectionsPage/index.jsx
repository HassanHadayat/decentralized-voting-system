import React from "react";
import { Header} from "../../../components/components";
import "../../../assets/styles/stylesheet.css";

function ManageElectionsPage() {
  return (
    <>
      <Header />
      <main className="post-611 page type-page status-publish hentry theme-blue">

        <h1>Manage Elections</h1>
        <div className="wp-block-group wp-block-ctcl-election-website-tile-nav-section-block tile-wrapper">
          <a href="/manage-elections/create-general-election" className="tile"><img decoding="async" width={50} height={50} alt="" src="data:image/svg+xml,%3Csvg%20width=%2251%22%20height=%2250%22%20viewBox=%220%200%2051%2050%22%20fill=%22none%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d=%22M9.417%208.971v-.333l-.2-.267-2.623-3.499.27-1.624h28.222a4%204%200%20014%204v40.1H9.416V8.971z%22%20fill=%22%23fff%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20d=%22M17.505%2042.586l-3.33-3.362%201.344-1.354%201.986%201.998%204.923-4.966%201.344%201.355-6.267%206.329z%22%20fill=%22%23004CB3%22/%3E%3Cpath%20d=%22M9.39%206.643v8.051H2.6v-8.05a3.395%203.395%200%20116.79%200z%22%20fill=%22%23D7D8E0%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20fill=%22%23004CB3%22%20d=%22M25.691%2038.744h8.637v1.921h-8.637zm-11.516-8.643h20.153v1.921H14.175zm0-4.803h20.153v1.921H14.175zm0-4.802h20.153v1.921H14.175zm0-4.802h20.153v1.921H14.175zm0-4.802h20.153v1.921H14.175z%22/%3E%3Cpath%20fill=%22%2355D5F1%22%20stroke=%22%23192754%22%20stroke-width=%222%22%20d=%22M44.925%2010.932h4.718v25.852h-4.718z%22/%3E%3Cpath%20d=%22M44.925%2036.863h4.718v4.42l-2.36%203.035-2.358-3.036v-4.42z%22%20fill=%22%23fff%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20d=%22M49.642%208.488v3.325h-4.717V8.488a2.359%202.359%200%20014.718%200z%22%20fill=%22%23EE5C4A%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3C/svg%3E" />
            <label>Create General Election</label>
          </a>
          <a href="/manage-elections/create-provincial-election" className="tile"><img decoding="async" width={50} height={50} alt="" src="data:image/svg+xml,%3Csvg%20width=%2251%22%20height=%2250%22%20viewBox=%220%200%2051%2050%22%20fill=%22none%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d=%22M9.417%208.971v-.333l-.2-.267-2.623-3.499.27-1.624h28.222a4%204%200%20014%204v40.1H9.416V8.971z%22%20fill=%22%23fff%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20d=%22M17.505%2042.586l-3.33-3.362%201.344-1.354%201.986%201.998%204.923-4.966%201.344%201.355-6.267%206.329z%22%20fill=%22%23004CB3%22/%3E%3Cpath%20d=%22M9.39%206.643v8.051H2.6v-8.05a3.395%203.395%200%20116.79%200z%22%20fill=%22%23D7D8E0%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20fill=%22%23004CB3%22%20d=%22M25.691%2038.744h8.637v1.921h-8.637zm-11.516-8.643h20.153v1.921H14.175zm0-4.803h20.153v1.921H14.175zm0-4.802h20.153v1.921H14.175zm0-4.802h20.153v1.921H14.175zm0-4.802h20.153v1.921H14.175z%22/%3E%3Cpath%20fill=%22%2355D5F1%22%20stroke=%22%23192754%22%20stroke-width=%222%22%20d=%22M44.925%2010.932h4.718v25.852h-4.718z%22/%3E%3Cpath%20d=%22M44.925%2036.863h4.718v4.42l-2.36%203.035-2.358-3.036v-4.42z%22%20fill=%22%23fff%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20d=%22M49.642%208.488v3.325h-4.717V8.488a2.359%202.359%200%20014.718%200z%22%20fill=%22%23EE5C4A%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3C/svg%3E" />
            <label>Create Provincial Election</label>
          </a>
          {/* <a href="/manage-elections/create-provincial-election" className="tile">
            <img decoding="async" width={50} height={50} alt="" src="data:image/svg+xml,%3Csvg%20width=%2250%22%20height=%2249%22%20viewBox=%220%200%2050%2049%22%20fill=%22none%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d=%22M48.944%2017.183v29.819H2.041v-29.82L25.492%201.21l23.451%2015.973z%22%20fill=%22%2355D5F1%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20d=%22M7.91%206.878h35.165v14.689L25.493%2032.14%207.91%2021.567V6.877z%22%20fill=%22%23fff%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20fill=%22%23004CB3%22%20d=%22M21.7%2010.776h16.627v1.959H21.7zm0%204.898h16.627v1.959H21.7zm0%204.898h16.627v1.959H21.7zm0%204.898h12.943l-3.274%201.96H21.7v-1.96z%22/%3E%3Cpath%20fill=%22%23EE5C4A%22%20stroke=%22%23EE5C4A%22%20stroke-width=%222%22%20d=%22M12.8%2011.776h4.846v4.857H12.8z%22/%3E%3Cpath%20d=%22M12.8%2021.572h4.846v5.858H12.8v-5.858z%22%20fill=%22%23D8DAE2%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20d=%22M24.977%2032.205l.516.31.515-.31%2022.936-13.784v26.58a2%202%200%2001-2%202H2.041v-28.58l22.935%2013.784z%22%20fill=%22%23F4F6FF%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20d=%22M48.965%2018.123L2.51%2046.533m45.967%200L1.531%2018.122%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3C/svg%3E" />
            <label>Create Provincial Election</label>
          </a> */}
        </div>
      </main>
    </>
  );
}

export default ManageElectionsPage;
