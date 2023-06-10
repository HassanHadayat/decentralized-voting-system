import { React } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/contexts";
import { Dropdown } from '@trimbleinc/modus-react-bootstrap';
import PropTypes from 'prop-types';
import { logo64 } from "../../assets/images/images";
import "../../assets/styles/stylesheet.css";
import "../../assets/styles/header.css";
// for light mode
// import '@trimbleinc/modus-react-bootstrap/css/dist/modus-react-bootstrap.min.css';

function Header({ isLanding = false }) {

  const { user, handleLogout } = useUserContext();
  const navigate = useNavigate();

  const handleLogoutChange = () => {
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

          {/* Other Pages Header */}
          {!isLanding &&
            <ul id="menu-top-nav-menu" className="menu">
              {/* <li className="menu-item">
                <a href="/home">How to use?</a>
              </li>
              <li className="menu-item">
                <a href="/home">FAQs</a>
              </li> */}

              <li className="menu-item">
                <p>
                  {user? user.name: ""}
                  {/* Hassan Hadayat */}
                </p>
              </li>

              <li style={{ marginLeft: '5px' }} className="menu-item">
                {/* <a onClick={handleLogoutChange}>Notifications</a> */}
                <Dropdown>
                  <Dropdown.Toggle
                    variant="text-dark"
                    id="dropdown-basic"
                    size="lg"
                    bsPrefix
                    className="btn-icon-only"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="mi-outline mi-person-account" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18c-2.14 0-4.09-.85-5.53-2.23 1.5-.64 3.38-1.06 5.53-1.06s4.01.43 5.51 1.07A7.98 7.98 0 0 1 12 20Zm6.82-3.84c-1.89-.91-4.25-1.46-6.82-1.46s-4.93.55-6.82 1.45A7.972 7.972 0 0 1 4 11.99c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.53-.44 2.95-1.18 4.16ZM12 5.72c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4Zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z" />
                    </svg>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      style={{ display: 'flex', justifyContent: 'space-between', gap: '5px', fontSize: '16px' }}
                      href="/change-password"
                    >
                      <span>
                        Change Password
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="mi-outline mi-password" viewBox="0 0 24 24">
                        <path d="M3 17h18c.55 0 1 .45 1 1s-.45 1-1 1H3c-.55 0-1-.45-1-1s.45-1 1-1Zm-.5-4.43c.36.21.82.08 1.03-.28l.47-.82.48.83c.21.36.67.48 1.03.28.36-.21.48-.66.28-1.02l-.49-.84h.95c.41 0 .75-.34.75-.75s-.34-.75-.75-.75H5.3l.47-.82c.21-.36.09-.82-.27-1.03a.764.764 0 0 0-1.03.28L4 8.47l-.47-.82a.764.764 0 0 0-1.03-.28c-.36.21-.48.67-.27 1.03l.47.82h-.95c-.41 0-.75.34-.75.75s.34.75.75.75h.95l-.48.83c-.2.36-.08.82.28 1.02Zm8 0c.36.21.82.08 1.03-.28l.47-.82.48.83c.21.36.67.48 1.03.28.36-.21.48-.66.28-1.02l-.48-.83h.95c.41 0 .75-.34.75-.75s-.34-.75-.75-.75h-.96l.47-.82a.76.76 0 0 0-.27-1.03.746.746 0 0 0-1.02.27l-.48.82-.47-.82a.742.742 0 0 0-1.02-.27c-.36.21-.48.67-.27 1.03l.47.82h-.96c-.41 0-.75.33-.75.74s.34.75.75.75h.95l-.48.83c-.2.36-.08.82.28 1.02ZM23 9.97c0-.41-.34-.75-.75-.75h-.95l.47-.82a.76.76 0 0 0-.27-1.03.746.746 0 0 0-1.02.27l-.48.83-.47-.82a.742.742 0 0 0-1.02-.27c-.36.21-.48.67-.27 1.03l.47.82h-.95a.75.75 0 0 0-.76.74c0 .41.34.75.75.75h.95l-.48.83a.74.74 0 0 0 .28 1.02c.36.21.82.08 1.03-.28l.47-.82.48.83c.21.36.67.48 1.03.28.36-.21.48-.66.28-1.02l-.48-.83h.95c.4 0 .74-.35.74-.76Z" />
                      </svg>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      style={{ display: 'flex', justifyContent: 'space-between', gap: '5px', fontSize: '16px' }}
                      onClick={handleLogoutChange}
                    >
                      <span>
                        Logout
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="mi-outline mi-sign-out" viewBox="0 0 24 24">
                        <path d="M11.5 18.25H8.75V16c0-.41-.34-.75-.75-.75s-.75.34-.75.75v3c0 .41.34.75.75.75h3.5c.41 0 .75-.34.75-.75s-.34-.75-.75-.75Zm.28-6.24c0-.55-.45-1-1-1H5.79v-1.8c0-.45-.54-.67-.85-.35l-2.79 2.79c-.2.2-.2.51 0 .71l2.79 2.79c.32.31.85.09.85-.35v-1.78h4.99c.55 0 1-.45 1-1Zm9.59-7.06-5.95-2.38a1.003 1.003 0 0 0-1.37.93v17.15c0 .58.47 1 1 1 .14 0 .29-.03.44-.1l5.95-2.89c.34-.17.56-.52.56-.9V5.88a1 1 0 0 0-.63-.93ZM20 17.13l-3.95 1.92V4.98L20 6.56v10.57ZM11.5 4.25H8c-.41 0-.75.34-.75.75v3c0 .41.34.75.75.75s.75-.34.75-.75V5.75h2.75c.41 0 .75-.34.75-.75s-.34-.75-.75-.75Z" />
                      </svg>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>

            </ul> 
          }

          {/* Landing Pages Header */}
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
