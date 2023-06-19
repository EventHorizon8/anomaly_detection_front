import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AccountSliceType from "@/type/slice/AccountSliceType";
import {loadAccountData, login} from "@/store/account/account-thunks";

const initialAccountState: AccountSliceType = {
  id: null,
  name: 'Anonymous',
  email: '',
  accessToken: (localStorage ? localStorage.getItem('access_token') : null) || null,
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialAccountState,
  reducers: {
    setAccessToken: (
      state,
     { payload }: PayloadAction<{accessToken: string}>
    ) => {
      state.accessToken = payload.accessToken;
      localStorage.setItem('access_token', payload.accessToken);
    },
    accountCleanup: (state) => {
      state.id = null;
      state.name = 'Anonymous';
      state.email = '';
      state.accessToken = null;
      localStorage.setItem('access_token', '');
    }
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.id = null;
      state.name = 'Anonymous';
      state.email = '';
      state.accessToken = '';
      localStorage.setItem('access_token', '');
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.accessToken = payload.accessToken;
      localStorage.setItem('access_token', payload.accessToken);
    });

    // Load Account Data
    builder.addCase(loadAccountData.fulfilled, (state, { payload }) => {
      state.id = payload.id;
      state.name = payload.name;
      state.email = payload.email;
    });
    builder.addCase(loadAccountData.rejected, (state) => {
      state.id = null;
      state.name = 'Anonymous';
      state.email = '';
      state.accessToken = '';
      localStorage.setItem('access_token', '');
    });
  }
});

export const {
  setAccessToken,
  accountCleanup,
} = accountSlice.actions;

export default accountSlice.reducer;
