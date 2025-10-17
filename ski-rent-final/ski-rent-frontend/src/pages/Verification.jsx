import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';

export default function Verification() {
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const handleInput = (index, e) => {
    const { value } = e.target;
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/editcontract');
  };

  return (
    <div className="page auth-page">
      <div className="login-container">
        <div className="logo"></div>

        <div className="form">
          <h2>Введите код подтверждения</h2>
          <form onSubmit={handleSubmit}>
            <label>Мы отправили код на вашу почту</label>
            <div className="code-inputs">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="code-field"
                  ref={(el) => (inputRefs.current[index] = el)}
                  onInput={(e) => handleInput(index, e)}
                  required
                />
              ))}
            </div>
            <button type="submit" className="btn">Continue</button>
          </form>

          <button
            className="social-btn"
            onClick={() => navigate('/addcontract')}
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
