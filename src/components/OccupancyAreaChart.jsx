import { AreaChart } from "@tremor/react";
import styles from "/src/components/OccupancyAreaChart.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const valueFormatter = function (number) {
  return new Intl.NumberFormat("eu").format(number).toString() + "%";
};

function OccupancyAreaChart() {
    const chartdata = [
        {
          date: 'September 2023',
          "Your occupancy rate": 40,
          "Other host's occupancy rate": 63,
        },
        {
          date: 'October 2023',
          "Your occupancy rate": 55,
          "Other host's occupancy rate": 79,
        },
        {
          date: 'November 2023',
          "Your occupancy rate": 66,
          "Other host's occupancy rate": 61,
        },
        {
          date: 'December 2023',
          "Your occupancy rate": 60,
          "Other host's occupancy rate": 87,
        },
        {
          date: 'January 2024',
          "Your occupancy rate": 30,
          "Other host's occupancy rate": 66,
        },
        {
          date: 'February 2024',
          "Your occupancy rate": 47,
          "Other host's occupancy rate": 67,
        }
      ];

  return (
    <div className={styles["price__chart__container"]}>
      <div className={styles["price__chart_graph"]}>
      <h2>Occupancy Rate</h2>
        <AreaChart
          className="mt-4 h-72"
          data={chartdata}
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