import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "@/store";
import API from "@/tool/API";

export const login = createAsyncThunk<
  any,
  { email: string; password: string; },
  { state: RootState }
>(
  "account/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await API.post(
        '/api/authorise',
        { email, password, device_name: 'Frontend' }
      );
      const accessToken = response.data.token;

      return {
        accessToken,
      }
    } catch (err) {
      const error = err as AxiosError;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue({
        errorCode: 'invalid_credentials',
        response: error.response.data,
      });
    }
  }
);

export const loadAccountData = createAsyncThunk<
  any,
  any,
  { state: RootState }
>(
  "account/loadAccountData",
  async (_, { rejectWithValue }) => {
    try {
      const accountResponse = await API.get('/api/account');

      const accountData: {
        id: number,
        name: string,
        email: string,
      } = accountResponse.data;
      return {
        ...accountData,
      }
    } catch (err) {
      const error = err as AxiosError;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue({
        errorCode: 'invalid_credentials',
        response: error.response.data,
      });
    }
  }
);
