import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "@/store";
import API from "@/tool/API";
import {generateClientStatsDemo} from "@/tool/Demo/ClientStatsDemo";

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
      return clientIdList.map((clientId) => ({
        clientId,
        stats: generateClientStatsDemo(timePeriod, .01),
      }));
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
