import React, { useState } from "react";
import styles from "/src/components/SignUp.module.css";
import { Link } from "react-router-dom";

function SignUpForm({ toggleSignUpPopup, handleToggle }) {
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
          <form className={styles["signup__form"]}>
            <input
              className={styles["input"]}
              type="email"
              placeholder="Email"
              required
            />
            <input
              className={styles["input"]}
              type="password"
              placeholder="Password"
              required
            />
            <p>Already have an account? <span onClick={handleToggle}>Log in instead</span>.</p>
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
