import React, { useState } from "react";
import styles from "/src/components/SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function SignUpForm({ toggleSignUpPopup, handleToggle }, props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password, name };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/signin");
      })
      .catch((error) => {
        if (error.response) {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        }
      });
  };

  return (
    <div className={styles["signup__overlay"]}>
      <div className={styles["signup__popup"]}>
        <div className={styles["popup__content"]}>
          <div className={styles["first__line"]}>
            <span className={styles["close"]} onClick={toggleSignUpPopup}>
              X
            </span>
            <h3>Register</h3>
          </div>
          <h2>Welcome to Airbnb</h2>
          <form
            className={styles["signup__form"]}
            onSubmit={handleSignupSubmit}
          >
            <input
              className={styles["input"]}
              type="name"
              placeholder="Name"
              required
              value={name}
              onChange={handleName}
            />
            <input
              className={styles["input"]}
              type="email"
              placeholder="E-mail"
              required
              value={email}
              onChange={handleEmail}
            />
            <input
              className={styles["input"]}
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={handlePassword}
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <p>
              Already have an account?{" "}
              <span onClick={handleToggle}>Log in instead</span>.
            </p>
            <button className={styles["button"]} type="submit">
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
