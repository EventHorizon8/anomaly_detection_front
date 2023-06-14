import React from 'react';
import moment from 'moment';
import classes from './logs.module.scss';
import TopBar from "@/component/layout/TopBar/TopBar";
import dataSet from './data';

const LogsPage: React.FC = () => {
  return (
    <>
      <TopBar />
      <div className={classes.Logs}>
        <h1>Журнал</h1>
        <table>
          <thead>
          <tr>
            <th>Время</th>
            <th>ProcessID</th>
            <th>ThreadID</th>
            <th>ParentProcessID</th>
            <th>UserID</th>
            <th>MountNamespace</th>
            <th>ProcessName</th>
            <th>HostName</th>
            <th>EventID</th>
            <th>EventName</th>
            <th>StackAddresses</th>
            <th>ArgsNum</th>
            <th>ReturnValue</th>
            <th>Args</th>
            <th>Аномалия</th>
          </tr>
          <tr>
            <th colSpan={15} className={classes.Logs__LoadMore}>
              <button>Загрузить ещё</button>
            </th>
          </tr>
          </thead>
          <tbody>
          {dataSet.map((row, key) => (
            <tr
              key={key}
              className={row.isAnomaly ? classes.Logs__Danger : ''}
            >
              <td>{moment.unix(row.timestamp).format("HH:mm:ss MM/DD/YYYY")}</td>
              <td>{row.processId}</td>
              <td>{row.threadId}</td>
              <td>{row.parentProcessId}</td>
              <td>{row.userId}</td>
              <td>{row.mountNamespace}</td>
              <td>{row.processName}</td>
              <td>{row.hostName}</td>
              <td>{row.eventId}</td>
              <td>{row.eventName}</td>
              <td>{row.stackAddresses.join(', ')}</td>
              <td>{row.argsNum}</td>
              <td>{row.returnValue}</td>
              <td>{row.args}</td>
              <td>{row.isAnomaly ? 'Да' : 'Нет'}</td>
            </tr>
          ))}
          <tr>
            <th colSpan={15} className={classes.Logs__LoadMore}>
              <button>Загрузить ещё</button>
            </th>
          </tr>
          </tbody>
          {/*
        {
  timestamp: number,
  processId: number,
  threadId: number,
  parentProcessId: number,
  userId: number,
  mountNamespace: number,
  processName: string,
  hostName: string,
  eventId: number,
  eventName: string,
  stackAddresses: number[],
  argsNum: number,
  returnValue: number,
  args: string,
  sus: number,
  evil: number,
  isAnomaly: boolean,
}
        */}
        </table>
      </div>
    </>
  )
};

export default LogsPage;
