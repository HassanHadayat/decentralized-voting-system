import React from "react";
import { Header } from "../../components/components";
import "../../assets/styles/stylesheet.css";
import "../../assets/styles/signinpage.css";

function SignInPage() {
  return (
    <>
      <Header isLanding={true} />

      <main className="signin-page-main theme-blue">
        <h2>SIGN IN</h2>
        <div className="wp-block-group">
          <form
            className="signin-form contact-form"
            id="signin-form"
            action="/home"
            // method="post"
          >
            <p>
              <label htmlFor="signin-cnic">Cnic </label>
              <input id="signin-cnic" type="text" defaultValue="" />
            </p>
            <p>
              <label htmlFor="signin-password">Password </label>
              <input id="signin-password" type="password" defaultValue="" />
            </p>
            <button className="signin-btn">Sign In</button>
          </form>
        </div>
      </main>
    </>
  );
}

export default SignInPage;
