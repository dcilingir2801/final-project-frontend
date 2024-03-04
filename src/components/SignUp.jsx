import React from "react";
import styles from "/src/components/SignUp.module.css"

function SignUpForm({ toggleSignUpPopup }) {
  return (
    <div className={styles["signup__popup"]}>
      <div className={styles["popup__content"]}>
        <span className={styles["close"]} onClick={toggleSignUpPopup}>&times;</span>
        <h2>Sign Up</h2>
        <form>
          <input type="text" placeholder="Username" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
