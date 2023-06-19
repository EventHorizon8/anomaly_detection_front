'use client';
import React, {useEffect, useMemo, useState} from 'react';
import classes from './Dashboard.module.scss';
import TopBar from "@/component/layout/TopBar/TopBar";
import CPUChart from "@/component/Charts/CPUChart";
import MemoryChart from "@/component/Charts/MemoryChart";
import DiskChart from "@/component/Charts/DiskChart";
import NetworkingChart from "@/component/Charts/NetworkingChart";
import AuthRequired from "@/component/layout/AuthRequired/AuthRequired";
import {useAppDispatch, useAppSelector} from "@/hooks/store-hooks";
import {getClientList, getClientStats} from "@/store/clients/clients-selectors";
import {loadClientList, loadClientStats} from "@/store/clients/clients-thunks";
import {cleanAllStats} from "@/store/clients/clients-slice";
import moment from "moment";
import {ClientChartStatsInterface} from "@/type/ClientStatsInterface";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const clientList = useAppSelector(getClientList);
  const clientStats = useAppSelector(getClientStats);
  const [isLoading, setIsLoading] = useState(false);
  const [showPeriod, setShowPeriod] = useState('zzz');

  useEffect(() => {
    if (isLoading || !showPeriod || !clientList) {
      return;
    }

    setIsLoading(true);
    dispatch(cleanAllStats);
    dispatch(loadClientStats({ clientIdList: clientList.map((client) => client.id) }));
  }, [showPeriod, dispatch, isLoading, clientList]);

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

  return (
    <AuthRequired>
      <TopBar />
      <div className={classes.Dashboard}>
        <div className={classes.Dashboard__Switches}>
          <button className={classes.Dashboard__Switches_Selected}>30 минут</button>
          <button>3 часа</button>
          <button>12 часов</button>
          <button>24 часа</button>
        </div>

        {clientList && (
          clientList.map((client) => (
            <div key={client.id}>
              {chartsAndStats[client.id] && (
                <>
                  <div className={classes.Dashboard__Row}>
                    <div className={classes.Dashboard__Cell}>
                      <div className={classes.Dashboard__Header}>
                        CPU
                      </div>
                      <div className={classes.Dashboard__Chart}>
                        <CPUChart
                          title="CPU"
                          chartStats={chartsAndStats[client.id]}
                        />
                      </div>
                    </div>
                    <div className={classes.Dashboard__Cell}>
                      <div className={classes.Dashboard__Header}>
                        Disk space
                      </div>
                      <div className={classes.Dashboard__Chart}>
                        <DiskChart
                          title="Disk Space"
                          chartStats={chartsAndStats[client.id]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={classes.Dashboard__Row}>
                    <div className={classes.Dashboard__Cell}>
                      <div className={classes.Dashboard__Header}>
                        Memory
                      </div>
                      <div className={classes.Dashboard__Chart}>
                        <MemoryChart
                          title="Free RAM"
                          chartStats={chartsAndStats[client.id]}
                        />
                      </div>
                    </div>
                    <div className={classes.Dashboard__Cell}>
                      <div className={classes.Dashboard__Header}>
                        Networking
                      </div>
                      <div className={classes.Dashboard__Chart}>
                        <NetworkingChart
                          title="Networking IO"
                          chartStats={chartsAndStats[client.id]}
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
