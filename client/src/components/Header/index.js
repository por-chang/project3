import React from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles/HeaderStyles';
import Auth from '../../utils/auth';
import logo from '../../assets/images/logo.png';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="mb-4 py-3 display-flex align-center" style={styles.header}>
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <img src={logo} alt="Logo" style={styles.image}></img>
        <Link className="text-dark" to="/">
          <h1 className="m-0" style={styles.textSize}>
            Welcome to Leash
          </h1>
        </Link>
        <p className="m-0" style={{ fontSize: '1.75rem', fontWeight: '700' }}>
          A new way to communicate
        </p>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/me">
                View My Profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
