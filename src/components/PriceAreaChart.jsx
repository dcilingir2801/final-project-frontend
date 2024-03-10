import { AreaChart } from "@tremor/react";
import styles from "/src/components/PriceAreaChart.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const valueFormatter = function (number) {
  return "€ " + new Intl.NumberFormat("eu").format(number).toString();
};

function PriceAreaChart() {
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
            "Your earnings": earnings,
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
              "Other hosts earnings": earnings / countByMonth[month],
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
      combinedDataMap[item.date] = { date: item.date, "Your earnings": item["Your earnings"] || 0 };
    });

    data2.forEach(item => {
      const existingItem = combinedDataMap[item.date];
      if (existingItem) {
        existingItem["Other hosts earnings"] = item["Other hosts earnings"] || 0;
      } else {
        combinedDataMap[item.date] = { date: item.date, "Other hosts earnings": item["Other hosts earnings"] || 0 };
      }
    });

    const combinedData = Object.values(combinedDataMap);
    return combinedData;
  };

  return (
    <div className={styles["price__chart__container"]}>
      <div className={styles["price__chart_text"]}>
        <h1>Compare your earnings</h1>
        <h2>You earned {`€${totalEarnings}`} in the past 6 months.</h2>
        {property.location && <p>{property.location.city}, {property.location.neighborhood}</p>}
        <p>
          Similar listings in your area earn <b>356€ more</b> on average per month.
        </p>
        <p>
        Explore various options to enhance your listing's appeal, such as adding amenities or adjusting prices, to maximize your occupancy and earnings.
        </p>
      </div>
      <div className={styles["price__chart_graph"]}>
        <AreaChart
          className="mt-4 h-72"
          data={combinedEarningsData}
          index="date"
          yAxisWidth={65}
          categories={["Your earnings", "Other hosts earnings"]}
          colors={["red", "green"]}
          valueFormatter={valueFormatter}
        />
      </div>
    </div>
  );
}

export default PriceAreaChart;