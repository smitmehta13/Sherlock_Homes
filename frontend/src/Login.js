import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, API_LOGIN_PATH } from './Constants';

function Login({ onLogin }) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Call the login API endpoint with the provided email and password
      const response = await axios.post(`${API_LOGIN_PATH}`, { email, password });

      // Assuming the login is successful
      // Generate a token or store user information in browser cookies or local storage

      // Set the session token or user information in browser cookies or local storage
      // Example using localStorage:
      localStorage.setItem('token', response.data.token);
      //localStorage.setItem('role', response.data.role);
      console.log(response.data.account.role);

      // Call the onLogin function to update the login status in the parent component
      onLogin(response.data.account.role);

      // Redirect to the desired page after login
      history.push('/');
    } catch (error) {
      console.error(error);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-page" style={{ background: 'linear-gradient(135deg, #555bad 0%, #555bad 100%)', height: '100vh' }}>
      <div className="row">
        <div className="col-md-6">
          {/* Replace the src attribute with the URL of your image */}
          <img src={`${API_BASE_URL}/uploads/754fddd1f40444aa8e2ec2758d109af7.png`} alt="Login Image" className="img-fluid" />
        </div>
        <div className="col-md-6">
          <div className="login-box">
            <div className="login-logo">
              <Link to="/" style={{ color: 'white', fontStyle: 'italic', fontWeight: 'bold' }}>
                Sherlock Homes
              </Link>
            </div>
            <div className="card">
              <div className="card-body login-card-body">
                <p className="login-box-msg">Sign in to start your session</p>
                <form onSubmit={handleLogin}>
                  <div className="input-group mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope"></span>
                      </div>
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock"></span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-8">
                      <div className="icheck-primary">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Remember Me</label>
                      </div>
                    </div>
                    <div className="col-4">
                      <button type="submit" className="btn btn-primary btn-block">
                        Sign In
                      </button>
                    </div>
                  </div>
                </form>
                {error && <p className="text-danger mt-2">{error}</p>}
                <p className="mb-1">
                  Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
