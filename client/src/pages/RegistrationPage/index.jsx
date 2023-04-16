import React from "react";
import { Header } from "../../components/components";
import "../../assets/styles/stylesheet.css";
import "../../assets/styles/registrationpage.css";

function RegistrationPage() {
  return (
    <>
      <Header isLanding={true} />

      <main className="reg-page-main theme-blue">
        <h2>REGISTRATION</h2>
        <div className="wp-block-group">
          <form
            className="reg-form contact-form"
            id="reg-form"
            action="/home"
            // method="post"
          >
            <p>
              <label htmlFor="reg-fullname">Full Name </label>
              <input id="reg-fullname" type="text" defaultValue="" />
            </p>
            <p>
              <label htmlFor="reg-cnic">Cnic </label>
              <input id="reg-cnic" type="text" defaultValue="" />
            </p>
            <p>
              <label htmlFor="reg-password">Password </label>
              <input id="reg-password" type="password" defaultValue="" />
            </p>
            <p>
              <label htmlFor="reg-conf-password">Confirm Password </label>
              <input id="reg-conf-password" type="password" defaultValue="" />
            </p>
            <button className="reg-btn">Register</button>
          </form>
        </div>
      </main>
    </>
  );
}

export default RegistrationPage;
