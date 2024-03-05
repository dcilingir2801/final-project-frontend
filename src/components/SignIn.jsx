import React from "react";
import styles from "/src/components/SignIn.module.css";
import { Link } from "react-router-dom";

function SignIn({ toggleSignUpPopup, handleToggle }) {
  return (
    <div className={styles["signin__overlay"]}>
      <div className={styles["signin__popup"]}>
        <div className={styles["popup__content"]}>
          <div className={styles["first__line"]}>
             <span className={styles["close"]} onClick={toggleSignUpPopup}>X</span> 
            <h3>Log in</h3>
          </div>
          <h2>Welcome back!</h2>
          <form className={styles["signin__form"]}>
            <input className={styles["input"]} type="email" placeholder="Email" required />
            <input className={styles["input"]} type="password" placeholder="Password" required />
            <p>Don't have an account yet? <span onClick={handleToggle}>Register now</span>.</p>
            <button className={styles["button"]} type="submit">Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
