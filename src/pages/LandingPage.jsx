import { Link } from "react-router-dom";
import styles from "/src/pages/LandingPage.module.css";
import SignUpForm from "../components/SignUp";
import SignIn from "../components/SignIn";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";

function LandingPage() {
  const [showSignUpPopup, setShowSignUpPopup] = useState(false);
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  const toggleSignInPopup = () => {
    setShowSignInPopup((prev) => !prev);
    setShowSignUpPopup(false); 
  };

  const toggleSignUpPopup = () => {
    setShowSignUpPopup((prev) => !prev);
    setShowSignInPopup(false);
  };

  return (
    <div className={styles["landing__page__body"]}>
      <div className={styles["first__container"]}>
        <div className={styles["landing__page__text"]}>
          <p className={styles["first__line"]}>
            <span style={{ fontWeight: "800", fontSize: "25px" }}>airbnb </span>
            &nbsp;<button>2024</button>&nbsp;
            <span className={styles["spring__release"]}>
              <span>Spring</span>
              <span> Release</span>
            </span>
          </p>
          <h1>
            Unlocking
            <br /> new heights
          </h1>
          <p className={styles["first__paragraph"]}>
            Introducing advanced Optimization Tools for Hosts. Understand your
            potential and claim it.{" "}
          </p>
          {isLoggedIn ? (
            <Link to="/optimization">
              <button className={styles["try__button"]}>Try it now</button>
            </Link>
          ) : (
            <button className={styles["try__button"]} onClick={toggleSignInPopup}>
              Try it now
            </button>
          )}
        </div>
        <div className={styles["landing__page__img"]}>
          <img src="/src/assets/macbook.png" alt="macbook" />
        </div>
      </div>
      {showSignInPopup && <SignIn toggleSignUpPopup={toggleSignInPopup} handleToggle={toggleSignUpPopup}/>}
      {showSignUpPopup && <SignUpForm toggleSignUpPopup={toggleSignUpPopup} handleToggle={toggleSignInPopup} />} 
    </div>
  );
}

export default LandingPage;
