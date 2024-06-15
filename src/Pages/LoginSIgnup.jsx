import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSIgnup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call your API or perform any other action here
    setName(""); // Clear the name field
    setEmail(""); // Clear the email field
    setPassword(""); // Clear the password field
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            <input
              type="text"
              placeholder="Your Name"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button>Continue</button>
          <p className="loginsignup-login">
            Already have an account? Login here<span></span>
          </p>
          <div className="loginsignup-agree">
            <input type="checkbox" name="" id="" />
            <p>By continuing, I agree to the terms of use & privacy.</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSIgnup;
