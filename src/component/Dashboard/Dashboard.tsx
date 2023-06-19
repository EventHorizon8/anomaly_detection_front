'use client';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import classes from './Dashboard.module.scss';
import TopBar from "@/component/layout/TopBar/TopBar";
import CPUChart from "@/component/Charts/CPUChart";
import MemoryChart from "@/component/Charts/MemoryChart";
import DiskChart from "@/component/Charts/DiskChart";
import NetworkingChart from "@/component/Charts/NetworkingChart";
import AuthRequired from "@/component/layout/AuthRequired/AuthRequired";
import {useAppDispatch, useAppSelector} from "@/hooks/store-hooks";
import {getClientList, getClientStats, getClientStatsTimePeriod} from "@/store/clients/clients-selectors";
import {loadClientList, loadClientStats} from "@/store/clients/clients-thunks";
import {cleanAllStats, setTimePeriod} from "@/store/clients/clients-slice";
import moment from "moment";
import {ClientChartStatsInterface} from "@/type/ClientStatsInterface";
import clsx from "clsx";
import {useRouter} from "next/navigation";
import DiskIoChart from "@/component/Charts/DiskIoChart";

const timeMenu = [
  {
    title: '30 мин',
    value: 30 * 60
  },
  {
    title: '3 часа',
    value: 3 * 60 * 60
  },
  {
    title: '12 часов',
    value: 12 * 60 * 60
  },
  {
    title: '24 часов',
    value: 24 * 60 * 60
  },
]

const Dashboard: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const clientList = useAppSelector(getClientList);
  const clientStats = useAppSelector(getClientStats);
  const timePeriod = useAppSelector(getClientStatsTimePeriod);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading || !timePeriod || !clientList) {
      return;
    }

    setIsLoading(true);
    dispatch(cleanAllStats());
    dispatch(loadClientStats({
      clientIdList: clientList.map((client) => client.id),
      timePeriod,
    })).then(() => {
      setIsLoading(false);
    });
  }, [timePeriod, dispatch, isLoading, clientList]);

  useEffect(() => {
    if (!clientList) {
      dispatch(loadClientList({}));
    }
  }, [clientList, dispatch]);

  const chartsAndStats = useMemo(() => {
    const response: {[clientId: number]: ClientChartStatsInterface[]} = {};
    Object.keys(clientStats).forEach((clientId) => {
      const stats = clientStats[parseInt(clientId, 10) || 0];
      if (typeof stats === 'undefined') {
        return;
      }
      if (!stats.statList.length) {
        return;
      }

      const cols = [];

      let statIndex = 0;
      while (statIndex < stats.statList.length) {
        const statRow = stats.statList[statIndex];
        const currentTsMkS = moment(statRow.dateTime).unix() * 1000000;
        const nextTsMkS = (
          (statIndex < (stats.statList.length - 1))
          ? moment(stats.statList[statIndex + 1].dateTime).unix() * 1000000
          : null
        );
        let anomalyCount = 0;
        for (const anomaly of stats.anomalyList) {
          if (currentTsMkS <= anomaly.timestampMkS) {
            if (!nextTsMkS) {
              anomalyCount ++;
            } else if (nextTsMkS > anomaly.timestampMkS) {
              anomalyCount ++;
            }

          }
        }
        cols.push({
          ...statRow,
          currentMks: currentTsMkS,
          anomalyCount
        });

        statIndex ++;
      }

      response[parseInt(clientId, 10) || 0] = cols;
    })
    return response;
  }, [clientStats]);

  const handleTimeButtonClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const value = parseInt(event.currentTarget.value, 10) || 1800;
    dispatch(setTimePeriod({ timePeriod: value }));
  }, [dispatch]);

  const handleChartClick = useCallback((clientId: number, dateTime: string) => {
    router.push(`/logs?client_id=${clientId}&date_time=${dateTime}`);
  }, [router]);

  return (
    <AuthRequired>
      <TopBar />
      <div className={classes.Dashboard}>
        <div className={classes.Dashboard__Switches}>
          {timeMenu.map((timeOption) => (
            <button
              key={timeOption.value}
              value={timeOption.value}
              onClick={handleTimeButtonClick}
              className={clsx({
                [classes.Dashboard__Switches_Selected]: timeOption.value === timePeriod,
              })}
            >
              {timeOption.title}
            </button>
          ))}
        </div>

        {clientList && (
          clientList.map((client) => (
            <div key={client.id}>
              <h1>{client.name}</h1>
              {chartsAndStats[client.id] && (
                <>
                  <div className={classes.Dashboard__Row}>
                    <div className={classes.Dashboard__Cell}>
                      <div className={classes.Dashboard__Header}>
                        CPU
                      </div>
                      <div className={classes.Dashboard__Chart}>
                        <CPUChart
                          chartStats={chartsAndStats[client.id]}
                          clientId={client.id}
                          handleChartClick={handleChartClick}
                        />
                      </div>
                    </div>
                    <div className={classes.Dashboard__Cell}>
                      <div className={classes.Dashboard__Header}>
                        Memory
                      </div>
                      <div className={classes.Dashboard__Chart}>
                        <MemoryChart
                          chartStats={chartsAndStats[client.id]}
                          clientId={client.id}
                          handleChartClick={handleChartClick}
                        />
                      </div>
                    </div>

                  </div>
                  <div className={classes.Dashboard__Row}>
                    <div className={classes.Dashboard__Cell}>
                      <div className={classes.Dashboard__Header}>
                        Disk space
                      </div>
                      <div className={classes.Dashboard__Chart}>
                        <DiskChart
                          chartStats={chartsAndStats[client.id]}
                          clientId={client.id}
                          handleChartClick={handleChartClick}
                        />
                      </div>
                    </div>
                    <div className={classes.Dashboard__Cell}>
                      <div className={classes.Dashboard__Header}>
                        Disk IO
                      </div>
                      <div className={classes.Dashboard__Chart}>
                        <DiskIoChart
                          chartStats={chartsAndStats[client.id]}
                          clientId={client.id}
                          handleChartClick={handleChartClick}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={classes.Dashboard__Row}>
                    <div className={classes.Dashboard__Cell}>
                      <div className={classes.Dashboard__Header}>
                        Networking
                      </div>
                      <div className={classes.Dashboard__Chart}>
                        <NetworkingChart
                          chartStats={chartsAndStats[client.id]}
                          clientId={client.id}
                          handleChartClick={handleChartClick}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </AuthRequired>
  )
};

export default Dashboard;
