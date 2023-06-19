import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import {AwsPureLogWithIdInterface} from "@/type/AwsLogTypes";
import config from "@/config/config";
import LogsDemo from "@/tool/Demo/LogsDemo";

export const loadClientLogsByDateTime = createAsyncThunk<
  {
    clientId: number,
    dateTime: string,
    logs: AwsPureLogWithIdInterface[],
  },
  {
    clientId: number,
    dateTime: string,
  },
  { state: RootState }
>(
  "logs/loadClientLogByDateTime",
  async ({ clientId, dateTime }) => {
    if (config.env.demoMode && (typeof setTimeout !== 'undefined')) {
      // Генерация демонстрационных данных
      console.log('Генерация демонстрационных данных');
      await new Promise((success) => {
        setTimeout(success, 2000);
      });
      return {
        clientId,
        dateTime,
        logs: LogsDemo.generateForDateTime(dateTime),
      }
    }

    // TODO: Получение реальных данных
    return {
      clientId,
      dateTime,
      logs: [],
    }
  }
);

export const loadEarlierClientLogs = createAsyncThunk<
  {
    clientId: number,
    earlierLogs: AwsPureLogWithIdInterface[],
  },
  {},
  { state: RootState }
>(
  "logs/loadEarlierClientLogs",
  async (_, { getState }) => {
    const state = getState();
    const clientId = state.logs.clientId || 0;
    const currentLogs = state.logs.logs;
    if (!currentLogs || !currentLogs.length || !clientId) {
      return {
        clientId,
        earlierLogs: [],
      }
    }
    const logId = currentLogs[0].id;
    const logTimestamp = currentLogs[0].timestamp;

    if (config.env.demoMode && (typeof setTimeout !== 'undefined')) {
      // Генерация демонстрационных данных
      console.log('Генерация демонстрационных данных (загрузить предыдущие логи)');
      await new Promise((success) => {
        setTimeout(success, 2000);
      });
      return {
        clientId,
        earlierLogs: LogsDemo.generateBeforeLogId(logId, logTimestamp),
      }
    }

    // TODO: Получение реальных данных
    return {
      clientId,
      earlierLogs: [],
    }
  }
);

export const loadOlderClientLogs = createAsyncThunk<
  {
    clientId: number,
    olderLogs: AwsPureLogWithIdInterface[],
  },
  {},
  { state: RootState }
>(
  "logs/loadOlderClientLogs",
  async (_, { getState }) => {
    const state = getState();
    const clientId = state.logs.clientId || 0;
    const currentLogs = state.logs.logs;
    if (!currentLogs || !currentLogs.length || !clientId) {
      return {
        clientId,
        olderLogs: [],
      }
    }
    const logId = currentLogs[currentLogs.length - 1].id;
    const logTimestamp = currentLogs[currentLogs.length - 1].timestamp;

    if (config.env.demoMode && (typeof setTimeout !== 'undefined')) {
      // Генерация демонстрационных данных
      console.log('Генерация демонстрационных данных (загрузить последующие)');
      await new Promise((success) => {
        setTimeout(success, 2000);
      });
      return {
        clientId,
        olderLogs: LogsDemo.generateAfterLogId(logId, logTimestamp),
      }
    }

    // TODO: Получение реальных данных
    return {
      clientId,
      olderLogs: [],
    }
  }
);
