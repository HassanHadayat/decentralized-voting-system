import { React } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/contexts";
import PropTypes from 'prop-types';
import { logo64 } from "../../assets/images/images";
import "../../assets/styles/stylesheet.css";

function Header({ isLanding = false }) {
  
  const { handleLogout } = useUserContext();
  const navigate = useNavigate();

  const handleLogoutChange = () =>{
    handleLogout();
    navigate('/');
  };

  return (
    <header>
      <div className="header-wrapper">
        <a className="site-title-wrapper" href="/home" tabIndex={-1}>
          <img
            className="attachment-header-icon size-header-icon"
            width={56}
            height={56}
            src={logo64}
            style={{ filter: "drop-shadow(1px 1px 1px black)" }}
          />
          <h1 className="site-title">Decentralized Voting System</h1>
          <span
            className="mobile-menu icon-bars"
            aria-expanded="false"
            tabIndex={0}
          >
            <span className="icon-bar bar-top" />
            <span className="icon-bar bar-middle" />
            <span className="icon-bar bar-bottom" />
          </span>
        </a>
        <nav className="menu-top-nav-menu-container">

          {/* Landing Page Header */}
          {!isLanding &&
            <ul id="menu-top-nav-menu" className="menu">
              <li className="menu-item">
                <a href="/home">How to use?</a>
              </li>
              <li className="menu-item">
                <a href="/home">FAQs</a>
              </li>
              <li className="menu-item">
                {/* <a href="/home">News</a> */}
                <a onClick={handleLogoutChange}>News</a>
              </li>
            </ul>
          }

          {/* Other Pages Header */}
          {isLanding &&
            <ul id="menu-top-nav-menu" className="menu">
              <li className="menu-item">
                <a href="/registration">Registration</a>
              </li>
              <li className="menu-item">
                <a href="/signin">Sign In</a>
              </li>
            </ul>
          }

        </nav>
      </div>
    </header>
  );
}

Header.propTypes = {
  isLanding: PropTypes.bool
}
export default Header;
