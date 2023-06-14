'use client';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {useRef} from "react";


const options: Highcharts.Options = {
  title: {
    text: 'My chart'
  },
  series: [{
    type: 'line',
    data: [1, 2, 3]
  }]
};

const TestChart = () => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  return (
    <div style={{ width: '400px', height: '300px' }}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
      />
    </div>
  )
}

export default TestChart;
