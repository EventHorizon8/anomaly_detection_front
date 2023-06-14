'use client';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {useRef} from "react";


const options: Highcharts.Options = {
  chart: {
    height: '300px',
  },
  title: {
    text: 'Disk space',
  },
  xAxis: [{
    categories: Array.from(Array(30)).map(
      (value, key) => {
        return '15:' + (12 + key);
      }
    ),
    crosshair: true
  }],
  yAxis: [{ // Primary yAxis
    labels: {
      format: '{value} GB',
    },
    title: {
      text: 'Disk Space',
    },
    min: 0,
  }, { // Secondary yAxis
    title: {
      text: 'Аномалии',
    },
    labels: {
      format: '{value}',
    },
    opposite: true
  }],
  tooltip: {
    shared: true
  },
  legend: {
    align: 'center',
    verticalAlign: 'bottom',
  },
  series: [{
    name: 'Аномалии',
    type: 'column',
    yAxis: 1,
    data: [
      0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 1, 0, 0, 3, 0, 1, 0, 0, 1, 2, 5, 10, 33, 50, 44, 60, 40, 30, 20, 11,
    ],
    color: '#ce1c1c',
  }, {
    name: 'Disk space',
    type: 'spline',
    data: Array.from(Array(30)).map(
      () => {
        return 12.3;
      }
    ),
    tooltip: {
      valueSuffix: ' GB'
    }
  }]
};

const DiskChart = () => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
    />
  )
}

export default DiskChart;


