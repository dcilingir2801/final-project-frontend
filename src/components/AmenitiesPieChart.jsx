import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { DonutChart, Legend } from '@tremor/react';
import styles from "/src/components/AmenitiesPieChart.module.css";
import ListingDetails from "./ListingDetails";

const valueFormatter = number => `${Intl.NumberFormat('eu').format(number).toString()}`;

function AmenitiesPieChart() {
  const [amenitiesData, setAmenitiesData] = useState([]);
  const { propertyId } = useParams();
  const [property, setProperty] = useState({});
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortedAmenities, setSortedAmenities] = useState([]);
  const [executedCount, setExecutedCount] = useState(0);
  const [showListingDetailsPopup, setShowListingDetailsPopup] = useState(false);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/properties/${propertyId}`);
        setProperty(response.data);

        const propertyAmenities = response.data.amenities || [];
        const checkedAmenities = sortedAmenities.filter(([name]) => propertyAmenities.includes(name));
        const checkedAmenityNames = checkedAmenities.map(([name]) => name);
        setSelectedAmenities(checkedAmenityNames);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPropertyData();
  }, [propertyId, sortedAmenities]);

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

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedAmenities([...selectedAmenities, value]);
    } else {
      setSelectedAmenities(selectedAmenities.filter(item => item !== value));
    }
  };

  const toggleListingDetailsPopup = () => {
    setShowListingDetailsPopup((prev) => !prev);
  };

  return (
    <div className={styles['amenities__container']}>
      <div className={styles["chart__container"]}>
        <h2>Amenities</h2>
        <p>Similar listings in your area offer these amenities in their homes (by %).</p>
        <div className={styles['chart']}>
          <DonutChart
            data={amenitiesData}
            category="value"
            index="name"
            variant='pie'
            valueFormatter={valueFormatter}
            colors={["red-400", "red-200", "red-600", "red", "red-300", "red-500", "red-100", "red-700", "red-800"]}
            className="w-40"
          />
          <Legend
            categories={amenitiesData.map(item => item.name)}
            colors={["red-400", "red-200", "red-600", "red", "red-300", "red-500", "red-100", "red-700", "red-800"]}
            className="max-w-xs"
          />
        </div>
      </div>
      <div className={styles['checkbox__container']}>
        <h3>Consider investing in amenities</h3>
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
          <div className={styles['checkbox__text']}>
            <p>
              You are currently offering{' '}
              {selectedAmenities.slice(0, 3).map((amenity, index) => (
                <React.Fragment key={amenity}>
                  <b>{amenity}</b>
                  {index < 2 && ', '}
                </React.Fragment>
              ))}
              {selectedAmenities.length > 3 && (
                <React.Fragment>, and {selectedAmenities.slice(3).map(amenity => <b key={amenity}>{amenity}</b>).reduce((prev, curr) => [prev, ', ', curr])}</React.Fragment>
              )}{' '}
              as amenities in your Airbnb home. Have you made sure that all amenities you offer are being displayed in your listing? <br/><br/>Also, consider investing in amenities your fellow hosts are offering.
            </p>
            <button onClick={toggleListingDetailsPopup} className={styles['edit__listing__button']}>Edit your listing</button>
          </div>
        </div>
      </div>
      {showListingDetailsPopup && <ListingDetails toggleListingDetailsPopup={toggleListingDetailsPopup} handleCheckboxChange={handleCheckboxChange} selectedAmenities={selectedAmenities} amenitiesData={amenitiesData} sortedAmenities={sortedAmenities} executedCount={executedCount}/>}
    </div>
  );
}

export default AmenitiesPieChart;
