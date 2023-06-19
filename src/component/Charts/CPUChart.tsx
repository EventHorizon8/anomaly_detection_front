'use client';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, {useMemo, useRef} from "react";
import {ClientChartStatsInterface} from "@/type/ClientStatsInterface";
import moment from "moment";

const CPUChart: React.FC<{
  title: string,
  chartStats: ClientChartStatsInterface[],
}> = (
  {
    title,
    chartStats,
  }
) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const options: Highcharts.Options = useMemo(() => {
    return {
      chart: {
        height: '300px',
      },
      title: {
        text: 'CPU utilization',
      },
      xAxis: [{
        categories: chartStats.map((statRecord) => {
          return moment(statRecord.dateTime).format('HH:mm');
        }),

        crosshair: true
      }],
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value}%',
        },
        title: {
          text: 'CPU',
        },
        min: 0,
        max: 100,
      }, { // Secondary yAxis
        title: {
          text: 'Аномалии',
        },
        labels: {
          format: '{value}',
        },
        opposite: true,
        max: 50,
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
        data: chartStats.map((statRecord) => statRecord.anomalyCount),
        color: '#ce1c1c',
      }, {
        name: 'CPU',
        type: 'spline',
        data: chartStats.map((statRecord) => statRecord.cpu),
        tooltip: {
          valueSuffix: '%'
        }
      }]
    }
  }, [chartStats]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
    />
  )
}

export default CPUChart;


