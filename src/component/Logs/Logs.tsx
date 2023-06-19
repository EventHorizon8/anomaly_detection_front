'use client';
import React, {useCallback, useEffect} from 'react';
import moment from 'moment';
import classes from './Logs.module.scss';
import {useRouter, useSearchParams} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@/hooks/store-hooks";
import {getLogs, getLogsAreLoading, getLogsClientId, getLogsDateTime} from "@/store/logs/logs-selectots";
import {loadClientLogsByDateTime, loadEarlierClientLogs, loadOlderClientLogs} from "@/store/logs/logs-thunks";

const Logs: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useSearchParams();
  const dateTime = params.get('date_time') || null;
  const clientId = parseInt(params.get('client_id') || '1', 10) || 1;

  const loadedClientId = useAppSelector(getLogsClientId);
  const loadedDateTime = useAppSelector(getLogsDateTime);
  const logsAreLoading = useAppSelector(getLogsAreLoading);
  const logs = useAppSelector(getLogs);

  useEffect(() => {
    if (!dateTime) {
      router.push(`/logs?client_id=${clientId}&date_time=${moment().toISOString()}`);
    }
  }, [clientId, dateTime, router]);

  useEffect(() => {
    if (logsAreLoading || !dateTime) {
      return;
    }

    if ((clientId !== loadedClientId) || (loadedDateTime !== dateTime)) {
      dispatch(loadClientLogsByDateTime({ clientId, dateTime }));
    }
  }, [
    dispatch,
    loadedClientId,
    clientId,
    loadedDateTime,
    dateTime,
    logsAreLoading,
  ]);

  const loadEarlier = useCallback(() => {
    if (logsAreLoading) {
      return;
    }
    dispatch(loadEarlierClientLogs({}));
  }, [logsAreLoading, dispatch]);

  const loadOlder = useCallback(() => {
    if (logsAreLoading) {
      return;
    }
    dispatch(loadOlderClientLogs({}));
  }, [logsAreLoading, dispatch]);

  return (
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
        {logs && (
          <tr>
            <th colSpan={15} className={classes.Logs__LoadMore}>
              {logsAreLoading ? (
                'Загрузка...'
              ) : (
                <button onClick={loadEarlier}>Загрузить предыдущие</button>
              )}
            </th>
          </tr>
        )}

        </thead>
        <tbody>
        {logs ? (
          logs.map((row, key) => (
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
          ))
        ) : (
          <tr>
            <th colSpan={15} className={classes.Logs__Loading}>
              Загрузка...
            </th>
          </tr>
        )}

        {logs && (
          <tr>
            <th colSpan={15} className={classes.Logs__LoadMore}>
              {logsAreLoading ? (
                'Загрузка...'
              ) : (
                <button onClick={loadOlder}>Загрузить последующие</button>
              )}
            </th>
          </tr>
        )}
        </tbody>

      </table>
    </div>
  )
};

export default Logs;
