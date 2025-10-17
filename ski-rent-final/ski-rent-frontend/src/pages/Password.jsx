import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';

export default function Password() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/info-menu');
  };

  return (
    <div className="page auth-page">
      <div className="login-container">
        <div className="logo"></div>

        <div className="form">
          <h2>Log in with your password</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password">Password</label>
              <br />
              <input
                id="password"
                maxLength="6"
                placeholder="Enter your password"
                required
                type="password"
              />
            </div>
            <br />
            <button className="btn" type="submit">
              Continue
            </button>
          </form>

          <button
            className="social-btn"
            onClick={() => navigate('/login')}
          >
            Go back
          </button>
        </div>

        <div className="info">
          <span>Please review the site, </span>
          <button className="info-btn">Terms &amp; Documents</button>
        </div>
      </div>
    </div>
  );
}
