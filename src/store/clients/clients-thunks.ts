import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "@/store";
import API from "@/tool/API";
import {generateClientStatsDemo} from "@/tool/Demo/ClientStatsDemo";
import config from "@/config/config";

export const loadClientList = createAsyncThunk<
  any,
  any,
  { state: RootState }
>(
  "clients/loadClientList",
  async (_, { rejectWithValue }) => {
    try {
      const clientListResponse = await API.get('/api/clients');
      return {
        clientList: clientListResponse.data,
      }
    } catch (err) {
      const error = err as AxiosError;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue({
        errorCode: 'client_list_error',
        response: error.response.data,
      });
    }
  }
);

export const loadClientStats = createAsyncThunk<
  any,
  {
    clientIdList: number[],
    timePeriod: number,
  },
  { state: RootState }
>(
  "client/loadClientStats",
  async ({ clientIdList, timePeriod }, { rejectWithValue }) => {
    try {
      if (config.env.demoMode) {
        return clientIdList.map((clientId) => ({
          clientId,
          stats: generateClientStatsDemo(timePeriod, .01),
        }));
      } else {
        return await Promise.all(clientIdList.map(async (clientId: number) => {
          // /api/clients/{id}/dashboard?period_seconds={количество в секундах}
          const statResponse = await API.get(
            `/api/clients/${clientIdList[0]}/dashboard?period_seconds=${timePeriod}`
          );
          return {
            clientId,
            stats: statResponse.data,
          }
        }));
      }
    } catch (err) {
      const error = err as AxiosError;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue({
        errorCode: 'client_stats_error',
        response: error.response.data,
      });
    }
  }
);
