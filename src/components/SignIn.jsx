import React, { useState } from "react";
import styles from "/src/components/SignIn.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

const API_URL = "http://localhost:5005";

function SignIn({ toggleSignUpPopup, handleToggle }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);
        storeToken(response.data.authToken);
        authenticateUser();
        toggleSignUpPopup();
        navigate("/optimization");
      })
      .catch((error) => {
        if (error.response) {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        }
      });
  };

  return (
    <div className={styles["signin__overlay"]}>
      <div className={styles["signin__popup"]}>
        <div className={styles["popup__content"]}>
          <div className={styles["first__line"]}>
            <span className={styles["close"]} onClick={toggleSignUpPopup}>
              X
            </span>
            <h3>Log in</h3>
          </div>
          <h2>Welcome back!</h2>
          <form onSubmit={handleLoginSubmit} className={styles["signin__form"]}>
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
              Don't have an account yet?{" "}
              <span onClick={handleToggle}>Register now</span>.
            </p>
            <button className={styles["button"]} type="submit">
              Continue
            </button>
          </form>
          <div className={styles["other__buttons"]}>
          <div className={styles["separator"]}>or</div>
          <button><img src="/src/assets/facebook.png" alt="Facebook Icon"/>Continue with Facebook</button>
          <button><img src="/src/assets/google.png" alt="Google Icon" />Continue with Google</button>
          <button><img src="/src/assets/apple.png" alt="Apple Icon" /> Continue with Apple</button>
          <button><img src="/src/assets/email.png" alt="Email Icon" />Continue with email</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
