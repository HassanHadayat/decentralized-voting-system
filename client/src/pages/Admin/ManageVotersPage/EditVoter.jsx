import React from "react";
import { Header } from "../../../components/components";
import "../../../assets/styles/stylesheet.css";
import "../../../assets/styles/add-voter-page.css";

function EditVoter() {
  return (
    <>
      <Header isLanding={false} />

      <main className="add-voter-psage-main theme-blue">
        <h2>EDIT VOTER</h2>
        <div className="wp-block-group">
          <form
            className="add-voter-form contact-form"
            id="add-voter-form"
            action="/home"
          >
            <p>
              <label htmlFor="add-voter-cnic">Cnic </label>
              <input id="add-voter-cnic" type="text" defaultValue="" placeholder="Enter Voter Cnic" />
            </p>
            {/* <p>
              <label htmlFor="add-voter-na">National Assembly Constituency </label>
              <input id="add-voter-na" type="text" defaultValue="" />
            </p>
            <p>
              <label htmlFor="add-voter-pa">Provincial Assembly Constituency </label>
              <input id="add-voter-pa" type="text" defaultValue="" />
            </p> */}
            <button className="add-voter-btn">Enter</button>
          </form>
        </div>
      </main>
    </>
  );
}

export default EditVoter;
