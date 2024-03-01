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

const chartdata = [
  {
    date: 'Apr 23',
    'Distance Running': 165,
    'Road Cycling': 112,
    'Open Water Swimming': 125,
    'Hatha Yoga': 105,
    'Street Basketball': 170,
  },
  {
    date: 'May 23',
    'Distance Running': 153,
    'Road Cycling': 138,
    'Open Water Swimming': 165,
    'Hatha Yoga': 100,
    'Street Basketball': 110,
  },
  {
    date: 'Jun 23',
    'Distance Running': 124,
    'Road Cycling': 145,
    'Open Water Swimming': 175,
    'Hatha Yoga': 75,
    'Street Basketball': 140,
  },
];

function CheckInChart() {
  return (
    <>
      <BarChart
        className="h-72"
        data={chartdata}
        index="date"
        categories={['Distance Running', 'Road Cycling', 'Open Water Swimming']}
        colors={['cyan', 'blue', 'gray-300']}
        yAxisWidth={30}
      />
    </>
  );
}

export default CheckInChart;