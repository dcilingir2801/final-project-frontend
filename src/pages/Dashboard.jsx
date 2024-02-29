import PropertiesOverview from "./PropertiesOverview";
import styles from "/src/pages/Dashboard.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [listing, setListing] = useState({});
  const { propertyId } = useParams();
  const [showDropdown, setShowDropdown] = useState(false);

  const PROPERTY_API_URL = `http://localhost:5005/properties/${propertyId}`;

  const getProperty = () => {
    axios
      .get(PROPERTY_API_URL)
      .then((response) => setListing(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProperty();
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  console.log("Listing:", listing);
  console.log("First info =>", listing.title);
  console.log("Second info =>", listing.description);
  console.log("Third info =>", listing.price_per_night);
  console.log("Fourth info =>", listing.images);
  return (
    <div>
        <h2>{listing.title}</h2>
        <h3 onClick={toggleDropdown}>Change listing</h3>
        {showDropdown && (
          <div className={styles["dashboard__dropdown"]}>
            <p>Optimization *new*</p>
            <hr/>
            <p>Reservations</p>
            <p>Earnings</p>
            <p>Insights</p>
            <p>Create a new listing</p>
            <hr/>
            <p>Guidebooks</p>
            <p>Explore hosting resources</p>
            <p>Connect with Hosts near you</p>
          </div>
        )}
    </div>
  )
}

export default Dashboard;
