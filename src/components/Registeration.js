import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Registeration.css";

function Registeration() {
  return (
    // <Container className='signin-page'>
    <Col className="reg-panel">
      <Row>
        <h1 className="title">Registeration Panel</h1>
      </Row>
      <Row className="input-field">
        <div>
          <label htmlFor="cnic">CNIC</label><br />
          <input type="text" name="cnic"/>
        </div>
      </Row>
      <Row className="input-field">
        <div >
          <label htmlFor="pass">PASSWORD</label><br />
          <input type="password" name="pass" />
        </div>
      </Row>
      <Row className="input-field">
        <div >
          <label htmlFor="conf-pass">CONFIRM PASSWORD</label><br />
          <input type="password" name="conf-pass" />
        </div>
      </Row>
      <Row className="enter-field">
        <button className="enter-btn">
            Register
        </button>
      </Row>
    </Col>
    // </Container>
  );
}

export default Registeration;
