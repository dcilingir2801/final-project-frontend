import { useState, useContext, useEffect } from "react";
import styles from "./Navbar.module.css";
import logo from "/src/assets/airbnb_logo_navbar.png";
import { Link } from "react-router-dom";
import SignIn from "./SignIn";
import SignUpForm from "./SignUp";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const BACKEND_API = "http://localhost:5005";

function Navbar() {
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const [showSignUpPopup, setShowSignUpPopup] = useState(false);
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);
  const [userObject, setUserObject] = useState(null);

  useEffect(() => {
    if (isLoggedIn && user) {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        axios
          .get(`${BACKEND_API}/users/${user._id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            setUserObject(response.data);
          })
          .catch((error) => {
            console.log("Error while fetching user =>", error);
          });
      }
    }
  }, [isLoggedIn, user]);

  const toggleMenuDropdown = () => {
    setShowMenuDropdown(!showMenuDropdown);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const toggleSignInPopup = () => {
    setShowSignInPopup(!showSignInPopup);
    setShowSignUpPopup(false); // Ensure sign up popup is closed
  };

  const toggleSignUpPopup = () => {
    setShowSignUpPopup(!showSignUpPopup);
    setShowSignInPopup(false); // Ensure sign in popup is closed
  };

  return (
    <>
      <header className={styles["header"]}>
        <div className={styles["header__logo"]}>
          <Link to="/">
            <img src={logo} alt="Airbnb Logo" />
          </Link>
        </div>
        <div className={["header__text__container"]}>
          <div className={styles["header__text"]}>
            <p>Today</p>
            <p>Calendar</p>
            <p>Listings</p>
            <p>Inbox</p>
            <p onClick={toggleMenuDropdown}>Menu ▼</p>
          </div>
          {showMenuDropdown && (
            <div className={styles["menu__dropdown"]}>
              <Link to="/optimization">
                <p>
                  Optimization &nbsp;
                  <button className={styles["new__button"]}>NEW</button>
                </p>
              </Link>
              <hr />
              <p>Reservations</p>
              <p>Earnings</p>
              <p>Insights</p>
              <p>Create a new listing</p>
              <hr />
              <p>Guidebooks</p>
            </div>
          )}
        </div>
        <div className={styles["header__profile"]}>
          <img
            src="/src/assets/bell.png"
            alt="Bell"
            className={styles["header__bell"]}
          />
          <img
            src="/src/assets/user.png"
            alt="User"
            className={styles["header__user"]}
            onClick={toggleUserDropdown}
          />
          {showUserDropdown && (
            <div className={styles["user__dropdown"]}>
              {isLoggedIn ? (
                <>
                  <p>
                    <b>Profile</b>
                  </p>
                  <p>
                    <b>Account</b>
                  </p>
                  <p>
                    <b>Visit the Help Centre</b>
                  </p>
                  <p>
                    <b>Get help with a safety issue</b>
                  </p>
                  <p>
                    <b>Gift cards</b>
                  </p>
                  <hr />
                  <p>Language and translation</p>
                  <p>€ EUR</p>
                  <hr />
                  <p>Refer a host</p>
                  <p>Switch to travelling</p>
                  <p onClick={logOutUser}>Logout</p>
                </>
              ) : (
                <>
                  <p onClick={toggleSignUpPopup}>Sign Up</p>
                  <p onClick={toggleSignInPopup}>Log In</p>
                </>
              )}
            </div>
          )}
        </div>
      </header>
      {showSignInPopup && <SignIn toggleSignUpPopup={toggleSignInPopup} />}
      {showSignUpPopup && <SignUpForm toggleSignUpPopup={toggleSignUpPopup} />}
    </>
  );
}

export default Navbar;
