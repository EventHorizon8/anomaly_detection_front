'use client';
import React, {useEffect} from 'react';
import classes from './Dashboard.module.scss';
import TopBar from "@/component/layout/TopBar/TopBar";
import CPUChart from "@/component/Charts/CPUChart";
import MemoryChart from "@/component/Charts/MemoryChart";
import DiskChart from "@/component/Charts/DiskChart";
import NetworkingChart from "@/component/Charts/NetworkingChart";
import AuthRequired from "@/component/layout/AuthRequired/AuthRequired";
import {useAppDispatch, useAppSelector} from "@/hooks/store-hooks";
import {getClientList} from "@/store/clients/clients-selectors";
import {loadClientList} from "@/store/clients/clients-thunks";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const clientList = useAppSelector(getClientList);
  console.log(clientList);

  useEffect(() => {
    if (!clientList) {
      dispatch(loadClientList({}));
    }
  }, [clientList, dispatch]);

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

        <div className={classes.Dashboard__Row}>
          <div className={classes.Dashboard__Cell}>
            <div className={classes.Dashboard__Header}>
              CPU
            </div>
            <div className={classes.Dashboard__Chart}>
              <CPUChart />
            </div>
          </div>
          <div className={classes.Dashboard__Cell}>
            <div className={classes.Dashboard__Header}>
              Memory
            </div>
            <div className={classes.Dashboard__Chart}>
              <MemoryChart />
            </div>
          </div>
        </div>
        <div className={classes.Dashboard__Row}>
          <div className={classes.Dashboard__Cell}>
            <div className={classes.Dashboard__Header}>
              Disk space
            </div>
            <div className={classes.Dashboard__Chart}>
              <DiskChart />
            </div>
          </div>
          <div className={classes.Dashboard__Cell}>
            <div className={classes.Dashboard__Header}>
              Networking
            </div>
            <div className={classes.Dashboard__Chart}>
              <NetworkingChart />
            </div>
          </div>
        </div>
      </div>
    </AuthRequired>
  )
};

export default Dashboard;
