import { useState } from "react";
import styles from "./Navbar.module.css";
import logo from "/src/assets/airbnb_logo_navbar.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const toggleMenuDropdown = () => {
    setShowMenuDropdown(!showMenuDropdown);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
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
              <p>Optimization *new*</p>
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
              <p><b>Profile</b></p>
              <p><b>Account</b></p>
              <p><b>Visit the Help Centre</b></p>
              <p><b>Get help with a safety issue</b></p>
              <p><b>Gift cards</b></p>
              <hr />
              <p>Language and translation</p>
              <p>€ EUR</p>
              <hr />
              <p>Refer a host</p>
              <p>Switch to travelling</p>
              <p>Logout</p>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Navbar;
