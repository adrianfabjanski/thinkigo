import React from "react";
import "./Register.css";
import "./Link.css";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div>
      <div className="regis-container-grid">
        <div className="regis-container-left">
          <div className="regis-header">
            <h2 id="regis-header-h2">Welcome to</h2>
            <h1 id="regis-header-h1">Thinkigo</h1>
          </div>
        </div>
        <div className="regis-container-right">
          <h2 id="regis-header-h2-2">Register Here</h2>

          <div className="form-container">
            <form id="regis-form">
              <input
                type="text"
                placeholder="First Name"
                id="fname-input"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                id="lname-input"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                id="email-input"
                required
              />
              <input
                type="password"
                placeholder="Password"
                id="password-input"
                required
              />
              <button id="regis-btn" type="submit">
                Register
              </button>
            </form>
            <Link to="/login" className="linking">
              <div id="login-btn">« Back to login</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
