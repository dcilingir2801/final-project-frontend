import { useState, useContext, useEffect, useRef } from "react";
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

  const menuRef = useRef(null);
  const userRef = useRef(null);

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

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLoggedIn, user]);

  const handleClickOutside = (event) => {
    if (
      !menuRef.current?.contains(event.target) &&
      !userRef.current?.contains(event.target)
    ) {
      setShowMenuDropdown(false);
      setShowUserDropdown(false);
    }
  };

  const toggleMenuDropdown = () => {
    setShowMenuDropdown((prev) => !prev);
    setShowUserDropdown(false);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown((prev) => !prev);
    setShowMenuDropdown(false);
  };

  const toggleSignInPopup = () => {
    setShowSignInPopup((prev) => !prev);
    setShowSignUpPopup(false); 
  };

  const toggleSignUpPopup = () => {
    setShowSignUpPopup((prev) => !prev);
    setShowSignInPopup(false);
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
            <div className={styles["menu__dropdown"]} ref={menuRef}>
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
            ref={userRef}
          />
          {showUserDropdown && (
            <div className={styles["user__dropdown"]} ref={userRef}>
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
                  <p onClick={toggleSignUpPopup}>Sign up</p>
                  <p onClick={toggleSignInPopup}>Log in</p>
                  <hr/>
                  <p>Gift cards</p>
                  <p>Airbnb your home</p>
                  <p>Help centre</p>
                </>
              )}
            </div>
          )}
        </div>
      </header>
      {showSignInPopup && <SignIn toggleSignUpPopup={toggleSignInPopup} handleToggle={toggleSignUpPopup}/>}
      {showSignUpPopup && <SignUpForm toggleSignUpPopup={toggleSignUpPopup} handleToggle={toggleSignInPopup} />} 
    </>
  );
}

export default Navbar;
