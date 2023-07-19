import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Navbar({ handleLogout }) {
  const history = useHistory();
  const userRole = localStorage.getItem('role');

  const handleLogoutClick = () => {
    handleLogout();
    history.push('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
        Property Management System

        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
                <i className="fas fa-home"></i>
              </Link>
            </li>
            {userRole === '1' && (
              <li className="nav-item">
                <Link to="/account" className="nav-link">
                  Account
                </Link>
              </li>
            )}
            {userRole === '1' || userRole === 'manager' ? (
              <>
                <li className="nav-item">
                  <Link to="/lease" className="nav-link">
                    Lease
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/events" className="nav-link"> {/* Add the link to the Event page */}
                    Events
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/maintenance" className="nav-link">
                    Maintenance
                  </Link>
                </li>
              </>
            ) : null}
            {userRole === '1' || userRole === 'submanager' ? (
              <li className="nav-item">
                <Link to="/residence" className="nav-link">
                  Residence
                </Link>
              </li>
            ) : null}
            <li className="nav-item">
              <Link to="/unit" className="nav-link">
                Unit
              </Link>
            </li>
            {userRole === '1' && (
              <li className="nav-item">
                <Link to="/notification" className="nav-link">
                  Send Notification
                </Link>
              </li>
            )}
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={handleLogoutClick}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
