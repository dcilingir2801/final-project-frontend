import { AreaChart } from "@tremor/react";
import styles from "/src/components/OccupancyAreaChart.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const valueFormatter = function (number) {
  return new Intl.NumberFormat("eu").format(number).toString() + "%";
};

function OccupancyAreaChart() {
    const [property, setProperty] = useState({});
    const [totalEarnings, setTotalEarnings] = useState(0);
    const { propertyId } = useParams();
    const [combinedEarningsData, setCombinedEarningsData] = useState([]);
  
    useEffect(() => {
      const fetchPropertyData = () => {
        const PROPERTY_URL = `http://localhost:5005/properties/${propertyId}`;
        axios.get(PROPERTY_URL)
          .then(response => {
            setProperty(response.data);
            const earnings = response.data.earnings;
            const total = Object.values(earnings).reduce((acc, value) => acc + value, 0);
            setTotalEarnings(total);
            const earningsData = Object.entries(earnings).map(([date, earnings]) => ({
              date,
              "Your occupancy rate": earnings,
            }));
            setCombinedEarningsData(earningsData);
          })
          .catch(error => {
            console.log(error);
          });
      };
  
      fetchPropertyData();
    }, [propertyId]);
  
    useEffect(() => {
      const fetchListingsData = () => {
        if (property?.location?.neighborhood) {
          const LISTINGS_URL = `http://localhost:5005/listing/?neighborhood=${property?.location?.neighborhood}`;
          axios.get(LISTINGS_URL)
            .then(response => {
              const earningsByMonth = {};
              const countByMonth = {};
              response.data.forEach(listing => {
                Object.entries(listing.earnings).forEach(([month, earnings]) => {
                  earningsByMonth[month] = (earningsByMonth[month] || 0) + earnings;
                  countByMonth[month] = (countByMonth[month] || 0) + 1;
                });
              });
              const otherHostsEarningsData = Object.entries(earningsByMonth).map(([month, earnings]) => ({
                date: month,
                "Other host's occupancy rate": earnings / countByMonth[month],
              }));
              const mergedData = mergeEarningsData(combinedEarningsData, otherHostsEarningsData);
              setCombinedEarningsData(mergedData);
            })
            .catch(error => {
              console.log(error);
            });
        }
      };
  
      fetchListingsData();
    }, [property]);
  
    const mergeEarningsData = (data1, data2) => {
      const combinedDataMap = {};
  
      data1.forEach(item => {
        combinedDataMap[item.date] = { date: item.date, "Your occupancy rate": item["Your occupancy rate"] || 0 };
      });
  
      data2.forEach(item => {
        const existingItem = combinedDataMap[item.date];
        if (existingItem) {
          existingItem["Other host's occupancy rate"] = item["Other host's occupancy rate"] || 0;
        } else {
          combinedDataMap[item.date] = { date: item.date, "Other host's occupancy rate": item["Other host's occupancy rate"] || 0 };
        }
      });
  
      const combinedData = Object.values(combinedDataMap);
      return combinedData;
    };

  return (
    <div className={styles["price__chart__container"]}>
      <div className={styles["price__chart_graph"]}>
      <h2>Occupancy Rate</h2>
        <AreaChart
          className="mt-4 h-72"
          data={combinedEarningsData}
          index="date"
          yAxisWidth={65}
          categories={["Your occupancy rate", "Other host's occupancy rate"]}
          colors={["red", "green"]}
          valueFormatter={valueFormatter}
        />
      </div>
      <div className={styles["price__chart__text"]}>
        <h3>Ever heard of Smart Pricing?</h3>
        <p>
          Did you know that higher nightly prices are not an indicator for successful listings and great earnings? <b>The most important metric is you occupancy rate.</b> This is a direct indicator for a healthy price and value dynamic. 
        </p>
        <p>
        If you are happy with the value you are currently providing, Smart Pricing can help you taking out the guesswork of setting suitable rates, allowing you to focus in providing an exceptional experience for your guests. <u><b>Learn more about Smart Pricing</b></u>.
        </p>

        <button className={styles['edit__listing__button']}>Activate Smart Pricing</button>
      </div>
    </div>
  );
}

export default OccupancyAreaChart;