import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Container from "react-bootstrap/Container";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  return (
    <div className="signin-page">
      <Col className="signin-panel">
        <Row>
          <h1 className="title">SIGN IN PANEL</h1>
        </Row>
        <Row className="input-field">
          <div>
            <label htmlFor="cnic">CNIC</label>
            <br />
            <input type="text" name="cnic" />
          </div>
        </Row>
        <Row className="input-field">
          <div>
            <label htmlFor="pass">PASSWORD</label>
            <br />
            <input type="password" name="pass" />
          </div>
        </Row>
        <Row className="enter-field">
          <button className="enter-btn" onClick={() =>{
            navigate('/Home');
          }}>Sign In</button>
        </Row>
      </Col>
    </div>
  );
}

export default SignIn;
