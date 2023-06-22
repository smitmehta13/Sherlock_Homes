import React from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <div className="login-page">
      <div className="register-box">
        <div className="register-logo">
          <a href="/">Colorful Admin Panel</a>
        </div>
        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Register a new membership</p>
            <form>
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Full name" required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Email" required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input type="password" className="form-control" placeholder="Password" required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input type="password" className="form-control" placeholder="Retype password" required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
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
                  <button type="submit" className="btn btn-primary btn-block">Register</button>
                </div>
              </div>
            </form>
            <p className="mb-0">
              Already have an account? <a href="/login">Sign In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
