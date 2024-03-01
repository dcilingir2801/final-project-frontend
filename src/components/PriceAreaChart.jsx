import { AreaChart } from '@tremor/react';
import styles from "/src/components/PriceAreaChart.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

const chartdata = [
  {
    date: 'Jan 22',
    SemiAnalysis: 2890,
    'The Pragmatic Engineer': 2338,
  },
  {
    date: 'Feb 22',
    SemiAnalysis: 2756,
    'The Pragmatic Engineer': 2103,
  },
  {
    date: 'Mar 22',
    SemiAnalysis: 3322,
    'The Pragmatic Engineer': 2194,
  },
  {
    date: 'Apr 22',
    SemiAnalysis: 3470,
    'The Pragmatic Engineer': 2108,
  },
  {
    date: 'May 22',
    SemiAnalysis: 3475,
    'The Pragmatic Engineer': 1812,
  },
  {
    date: 'Jun 22',
    SemiAnalysis: 3129,
    'The Pragmatic Engineer': 1726,
  },
  {
    date: 'Jul 22',
    SemiAnalysis: 3490,
    'The Pragmatic Engineer': 1982,
  },
  {
    date: 'Aug 22',
    SemiAnalysis: 2903,
    'The Pragmatic Engineer': 2012,
  },
  {
    date: 'Sep 22',
    SemiAnalysis: 2643,
    'The Pragmatic Engineer': 2342,
  },
  {
    date: 'Oct 22',
    SemiAnalysis: 2837,
    'The Pragmatic Engineer': 2473,
  },
  {
    date: 'Nov 22',
    SemiAnalysis: 2954,
    'The Pragmatic Engineer': 3848,
  },
  {
    date: 'Dec 22',
    SemiAnalysis: 3239,
    'The Pragmatic Engineer': 3736,
  },
];

const valueFormatter = function (number) {
  return '€ ' + new Intl.NumberFormat('eu').format(number).toString();
};

function PriceAreaChart() {
    const [listings, setListings] = useState({});
    const { propertyId } = useParams();
    const [property, setProperty] = useState([]);

    const PROPERTY_URL = `http://localhost:5005/properties/${propertyId}`;
    const LISTINGS_URL = "http://localhost:5005/listings";

    const getProperty = () => {
        axios
        .get(PROPERTY_URL)
        .then((response) => setProperty(response.data))
        .catch((error) => console.log(error));
    };

    const getListings = () => {
        axios
        .get(LISTINGS_URL)
        .then((response) => setListings(response.date))
        .catch((error) => console.log(error));
    };

    useEffect(() => {
        getProperty();
        getListings();
      }, []);
    
  return (
    <div className={styles['price__chart__container']}>
    <div className={styles['price__chart_text']}>
      <h1>Compare your earnings</h1>
      <h2>€34,567</h2>
      <p>Similiar listings in your area, charge XXEUR more per night and earn XXEUR more per month.</p>
      <p>See below how to optimize your listing to reach a similiar price/value offering.</p>
    </div>
    <div className={styles['price__chart_graph']}>
      <AreaChart
        className="mt-4 h-72"
        data={chartdata}
        index="date"
        yAxisWidth={65}
        categories={['SemiAnalysis', 'The Pragmatic Engineer']}
        colors={['indigo', 'cyan']}
        valueFormatter={valueFormatter}
      />
    </div>
    </div>
  );
}

export default PriceAreaChart;