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
    '13PM': 3,
    '14PM': 5,
    '15PM': 6,
    '16PM': 1,
    '17PM': 1,
  },
  {
    date: 'Check-out time',
    '13PM': 8,
    '14PM': 7,
    '15PM': 4,
    '16PM': 1,
    '17PM': 0,
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
        categories={['13PM', '14PM', '15PM', '16PM', '17PM']}
        colors={['red-700', 'red-500', 'red-200', 'red-300', 'red-600']}
        yAxisWidth={30}
      />
      </div>
    </>
  );
}

export default CheckInChart;