import { React } from "react";
import "../../assets/styles/stylesheet.css";

function Footer() {
  return (
    <footer>
      <div className="footer-content-wrapper">
        <div className="contact">
          <h3>Contact</h3>
          <p className="office-title">Decentralized Voting System</p>
          <p className="info-item">
            <a href="mailto:dvs@gmail.com">dvs@gmail.com</a>
          </p>
          <p className="info-item">
            <a href="tel:5551234567">
              (+92) 312-4567891
            </a>
          </p>
          <p className="info-item">(+92) 312-4567891</p>
        </div>
        <div className="address">
          <h3>Visit</h3>
          <p className="info-item">
            1234 Main St.
            <br />
            Lahore, Pakistan
          </p>
          <p className="info-item hours">
            Open:
            <br />
            Weekdays 8 a.m. - 4 p.m.
          </p>
        </div>
        <div className="social">
          <h3>Social</h3>
          <ul className="info-item">
            <li>
              <a href="/">Twitter</a>
            </li>
            <li>
              <a href="/">
                Facebook
              </a>
            </li>
            <li>
              <a href="/">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
