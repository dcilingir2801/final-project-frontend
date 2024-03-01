import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "/src/pages/Dashboard.module.css";
import PriceAreaChart from "/src/components/PriceAreaChart";
import AmenitiesPieChart from "/src/components/AmenitiesPieChart";
import CheckInChart from "../components/CheckInChart";

function Dashboard() {
  const [listing, setListing] = useState({});
  const { propertyId } = useParams();
  const [showDropdown, setShowDropdown] = useState(false);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5005/properties")
      .then((response) => {
        setProperties(response.data);
        getProperty(propertyId || response.data[0]._id);
      })
      .catch((error) => console.log(error));
  }, []);

  const getProperty = (id) => {
    axios
      .get(`http://localhost:5005/properties/${id}`)
      .then((response) => setListing(response.data))
      .catch((error) => console.log(error));
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const handleListingChange = (propertyId) => {
    window.location.href = `/optimization/${propertyId}`;
    closeDropdown();
    getProperty(propertyId);
  };

  return (
    <div className={styles["dashboard__sidebar"]}>
      <h2>{listing.title}</h2>
      <h3 onClick={toggleDropdown}>Change listing</h3>
      {showDropdown && (
        <div className={styles["dashboard__dropdown"]}>
          {properties.map((property) => (
            <p key={property._id} onClick={() => handleListingChange(property._id)}>
              {property.title}
            </p>
          ))}
        </div>
      )}
      <div className={styles["dashboard__graph__container"]}>
        <PriceAreaChart />
        <h1>See where you can improve</h1>
        <AmenitiesPieChart />
        <CheckInChart />
      </div>
    </div>
  );
}

export default Dashboard;
