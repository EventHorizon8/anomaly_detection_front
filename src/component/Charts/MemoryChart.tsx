'use client';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {useRef} from "react";


const options: Highcharts.Options = {
  chart: {
    height: '300px',
  },
  title: {
    text: 'RAM',
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
      format: '{value} MB',
    },
    title: {
      text: 'RAM',
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
    name: 'RAM',
    type: 'spline',
    data: Array.from(Array(30)).map(
      () => {
        return 1400 + Math.round(Math.random() * 50)
      }
    ),
    tooltip: {
      valueSuffix: '%'
    }
  }]
};

const MemoryChart = () => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
    />
  )
}

export default MemoryChart;


