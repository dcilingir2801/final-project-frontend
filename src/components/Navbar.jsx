import { useState } from "react";
import styles from "./Navbar.module.css";
import logo from "/src/assets/airbnb_logo_navbar.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <>
      <header className={styles["header"]}>
        <div className={styles["header__logo"]}>
          <Link to="/">
          <img src={logo} alt="Airbnb Logo" />
          </Link> 
        </div>
        <div className={styles["header__text"]}>
          <p>Today</p>
          <p>Calendar</p>
          <p>Listings</p>
          <p>Inbox</p>
          <p onClick={toggleDropdown}>Menu</p>
          {showDropdown && (
            <div className={styles["header__dropdown"]}>
              <p>Optimization *new*</p>
              <hr />
              <p>Reservations</p>
              <p>Earnings</p>
              <p>Insights</p>
              <p>Create a new listing</p>
              <hr />
              <p>Guidebooks</p>
              <p>Explore hosting resources</p>
              <p>Connect with Hosts near you</p>
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
          />
        </div>
      </header>
    </>
  );
}

export default Navbar;
