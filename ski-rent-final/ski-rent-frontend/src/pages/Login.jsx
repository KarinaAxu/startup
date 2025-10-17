import React from 'react';
import '../style.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      localStorage.setItem('userEmail', email);
      navigate('/password'); // navigate to password page
    }
  };

  return (
    <div className="page auth-layout">
      {/* Canvas background */}
      <div aria-hidden="true" className="bg-wrap">
        <canvas id="bgCanvas"></canvas>
      </div>

      {/* Content */}
      <div className="left">
        <div className="logo"></div>
        <div className="form">
          <h2>Log in with your email</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <br />
              <input
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                type="email"
              />
            </div>
            <br />
            <button className="btn" type="submit">
              Continue
            </button>
          </form>
          <button className="social-btn" onClick={() => navigate('/main-menu')}>
            Go back
          </button>
        </div>
        <div className="info">
          <span>Please review the site,</span>
          <button className="info-btn">Terms &amp; Documents</button>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
}
