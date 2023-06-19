import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "@/store";
import API from "@/tool/API";

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
        errorCode: 'Cannot load client list',
        response: error.response.data,
      });
    }
  }
);
