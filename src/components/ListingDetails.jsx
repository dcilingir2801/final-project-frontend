import React, { useState, useEffect } from "react";
import styles from "/src/components/ListingDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function ListingDetails({ toggleListingDetailsPopup, handleCheckboxChange, selectedAmenities, amenitiesData, sortedAmenities, executedCount }) {
    const { propertyId } = useParams();
    const [property, setProperty] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [editableFields, setEditableFields] = useState({
        title: "",
        description: "",
        price_per_night: ""
    });
    const [savedMessageVisible, setSavedMessageVisible] = useState(false);

    useEffect(() => {
        axios
          .get(`${API_URL}/properties/${propertyId}`)
          .then((response) => {
            setProperty(response.data);
            setEditableFields({
                title: response.data.title,
                description: response.data.description,
                price_per_night: response.data.price_per_night.toString() // Convert to string if necessary
            });
          })
          .catch((error) => console.log(error));
    }, [propertyId]);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        try {
            await axios.put(`${API_URL}/properties/${propertyId}`, {
                title: editableFields.title,
                description: editableFields.description,
                price_per_night: editableFields.price_per_night // Include price_per_night in the request
                // Add more fields here as needed
            });
            setEditMode(false);
            setSavedMessageVisible(true);
            setTimeout(() => {
                setSavedMessageVisible(false);
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableFields(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        const fetchListingsData = async () => {
          if (property?.location?.neighborhood && executedCount < 2) {
            try {
              const response = await axios.get(`http://localhost:5005/listing/?neighborhood=${property.location.neighborhood}`);
              const listings = response.data;
              const frequencyMap = {};
              listings.forEach(listing => {
                listing.amenities.forEach(amenity => {
                  frequencyMap[amenity] = (frequencyMap[amenity] || 0) + 1;
                });
              });
    
              const sortedAmenities = Object.entries(frequencyMap).sort((a, b) => b[1] - a[1]);
    
              const topAmenities = sortedAmenities.slice(0, 9);
    
              setSortedAmenities(topAmenities);
    
              const amenitiesChartData = topAmenities.map(([name, value]) => ({ name, value }));
              setAmenitiesData(amenitiesChartData);
              
              setExecutedCount(prevCount => prevCount + 1);
            } catch (error) {
              console.log(error);
            }
          }
        };
    
        fetchListingsData();
      }, [property, executedCount]);

    return (
        <div className={styles["details__overlay"]}>
            <div className={styles["details__popup"]}>
                <div className={styles["popup__content"]}>
                    <div className={styles["first__line"]}>
                        <span className={styles["close"]} onClick={toggleListingDetailsPopup}>X</span>
                        <h3>Listing Details</h3>
                    </div>
                    <div className={styles["carousel-container"]}>
                        <div className={styles["carousel"]}>
                            <img src={property.image_bedroom} alt="Bedroom"/> 
                            <img src={property.image_kitchen} alt="Kitchen"/>
                            <img src={property.image_bathroom} alt="Bathroom"/>
                            <img src={property.image_living} alt="Living Room"/>
                        </div>
                    </div>
                    <div className={styles["details__title__button"]}>
                        {editMode ? (
                            <>
                                <input
                                    type="text"
                                    name="title"
                                    value={editableFields.title}
                                    onChange={handleChange}
                                />
                                <button onClick={handleSave} className={styles['edit__listing__button']}>Save</button>
                            </>
                        ) : (
                            <>
                                <h2>{property.title}</h2>
                                <button onClick={handleEdit} className={styles['edit__listing__button']}>Edit your listing</button>
                            </>
                        )}
                    </div>
                    <p><b>Price: </b>{editMode ? (
                        <>
                            <input
                                type="text"
                                name="price_per_night"
                                value={editableFields.price_per_night}
                                onChange={handleChange}
                            />
                            <span>€ per night</span>
                        </>
                    ) : (
                        `${property.price_per_night}€ per night`
                    )}&nbsp;&nbsp;&nbsp;&nbsp;<input
                                                type="checkbox"
                                                value={name}
                                            />&nbsp;Smart Pricing</p> 
                    <p><b>Rating: </b>&#9733;{property.rating} - <b><u>{property.reviews} reviews</u></b></p>
                    <p>{editMode ? (
                        <textarea
                            name="description"
                            value={editableFields.description}
                            onChange={handleChange}
                        />
                    ) : (
                        property.description
                    )}</p>
                    <div className={styles["last__row"]}>
                    <div className={styles['checkbox__container']}>
                        <h3>Amenities</h3>
                        <div className={styles['checkbox']}>
                            <ul>
                                {sortedAmenities.map(([name]) => (
                                    <li key={name}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value={name}
                                                onChange={handleCheckboxChange}
                                                checked={selectedAmenities.includes(name)}
                                            />
                                            {name}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className={styles["house__rules"]}>
                        <h3>House rules</h3>
                        <p>Check-in after 15:00</p>
                        <p>Checkout before 12:00</p>
                        <p>2 guests maximum</p>
                        <p>Pets allowed</p>
                        <p>No smoking</p>
                    </div>
                    <div className={styles["location"]}>
                        <img src="https://www.google.com/maps/d/thumbnail?mid=1vBgHfJaGBUrDdTFTyE-SSidfDrM&hl=en_US" />
                    </div>
                    </div>
                </div>
                {savedMessageVisible && <div className={styles["saved__message"]}>Saved!</div>}
            </div>
        </div>
    );
}

export default ListingDetails;
