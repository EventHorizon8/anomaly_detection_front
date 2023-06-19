'use client';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, {useMemo, useRef} from "react";
import {ClientChartStatsInterface} from "@/type/ClientStatsInterface";
import moment from "moment";

const DiskChart: React.FC<{
  chartStats: ClientChartStatsInterface[],
  clientId: number,
  handleChartClick: (clientId: number, dateTime: string) => any
}> = (
  {
    chartStats,
    clientId,
    handleChartClick,
  }
) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const options: Highcharts.Options = useMemo(() => {
    return {
      accessibility: {
        enabled: false,
      },
      chart: {
        height: '300px',
        zooming: {
          type: 'x',
        },
      },
      title: {
        text: 'Free space',
      },
      xAxis: [{
        categories: chartStats.map((statRecord) => {
          return moment(statRecord.dateTime).format('HH:mm');
        }),

        crosshair: true
      }],
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value}GB',
        },
        title: {
          text: 'Disk space',
        },
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
        name: 'Disk space',
        type: 'spline',
        data: chartStats.map((statRecord) => statRecord.diskSpace),
        tooltip: {
          valueSuffix: 'GB'
        },
        cursor: 'pointer',
        events: {
          click: (event) => {
            handleChartClick(clientId, chartStats[event.point.x].dateTime);
          }
        },
      }]
    }
  }, [chartStats, clientId, handleChartClick]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
    />
  )
}

export default DiskChart;


