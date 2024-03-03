// NOTE: The tailwind.config.js has to be extended if you use custom HEX color
// ...['[#f0652f]'].flatMap((customColor) => [
//   `bg-${customColor}`,
//   `border-${customColor}`,
//   `hover:bg-${customColor}`,
//   `hover:border-${customColor}`,
//   `hover:text-${customColor}`,
//   `fill-${customColor}`,
//   `ring-${customColor}`,
//   `stroke-${customColor}`,
//   `text-${customColor}`,
//   `ui-selected:bg-${customColor}]`,
//   `ui-selected:border-${customColor}]`,
//   `ui-selected:text-${customColor}`,
// ]),

import { BarChart } from '@tremor/react';
import styles from "/src/components/CheckInChart.module.css";

const chartdata = [
  {
    date: 'Check-in time',
    'Distance Running': 165,
    'Road Cycling': 112,
    'Open Water Swimming': 125,
    'Hatha Yoga': 105,
    'Street Basketball': 170,
  },
  {
    date: 'Check-out time',
    'Distance Running': 153,
    'Road Cycling': 138,
    'Open Water Swimming': 165,
    'Hatha Yoga': 100,
    'Street Basketball': 110,
  },
];

function CheckInChart() {
  return (
    <>
    <div className={styles['barchart']}>
        <h2>Check-In & Check-Out</h2>
      <BarChart
        className="h-72"
        data={chartdata}
        index="date"
        categories={['Distance Running', 'Road Cycling', 'Open Water Swimming']}
        colors={['gray-600', 'red', 'cyan']}
        yAxisWidth={30}
      />
      </div>
    </>
  );
}

export default CheckInChart;