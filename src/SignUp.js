import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const history = useHistory();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the signup data to the server
      const response = await axios.post('/api/signup', {
        fullName,
        email,
        password,
        confirmPassword,
        role,
      });

      // Assuming the signup is successful
      console.log(response.data); // Handle the response data if needed

      // Redirect to the login page after successful signup
      history.push('/login');
    } catch (error) {
      console.error(error);
      setError('Failed to signup. Please try again.'); // Update error state
    }
  };

  return (
    <div className="login-page">
      <div className="register-box">
        <div className="register-logo">
          <a href="/">Colorful Admin Panel</a>
        </div>
        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Register a new membership</p>
            {error && <div className="alert alert-danger">{error}</div>} {/* Display error message if signup fails */}
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user"></span>
                  </div>
                </div>
              </div>
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
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Retype password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <select
                  className="form-control"
                  value={role}
                  onChange={handleRoleChange}
                  required
                >
                  <option value="">Select role</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="submanager">Sub Manager</option>
                </select>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user"></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="agreeTerms" />
                    <label htmlFor="agreeTerms">
                      I agree to the <a href="/">terms</a>
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Register
                  </button>
                </div>
              </div>
            </form>
            <p className="mb-0">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
