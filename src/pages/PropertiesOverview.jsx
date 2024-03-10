import { Link } from "react-router-dom";
import styles from "/src/pages/PropertiesOverview.module.css"; 
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005/properties";

function PropertiesOverview() {
    const [properties, setProperties] = useState([]);

    const getAllProperties = () => {
        axios
            .get(API_URL)
            .then((response) => setProperties(response.data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllProperties();
    }, []);

    return (
        <div className={styles["properties-overview"]}>
            <h1>Your listings</h1>
            {properties.map((property) => (
                <div key={property.id} className={styles["property-card"]}>
                    <div className={styles["image-container"]}>
                        <img src={property.image} alt={property.title} />
                        <span>Listed</span>
                    </div>
                    <div className={styles["property-details"]}>
                        <h3>{property.title}</h3>
                        <p>{property.description}</p>
                        <p>Price per night: {property.price_per_night}EUR</p>
                        <p>Location: {property.location.city}, {property.location.neighborhood}</p>
                        <Link to={`/property/${property._id}`}><button>View Details</button></Link>
                        <Link to={`/optimization/${property._id}`}><button className={styles["notification"]}>Optimize your listing<span className={styles["badge"]}>NEW</span></button></Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PropertiesOverview;
