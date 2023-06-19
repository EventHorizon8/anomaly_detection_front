import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AccountSliceType from "@/type/slice/AccountSliceType";
import {loadAccountData, login} from "@/store/account/account-thunks";
import StoreAccessToken from "@/tool/StoreAccessToken";

const initialAccountState: AccountSliceType = {
  id: null,
  name: 'Anonymous',
  email: '',
  accessToken: StoreAccessToken.get(),
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
      StoreAccessToken.save(payload.accessToken)
    },
    accountCleanup: (state) => {
      state.id = null;
      state.name = 'Anonymous';
      state.email = '';
      state.accessToken = null;
      StoreAccessToken.clean();
    }
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.id = null;
      state.name = 'Anonymous';
      state.email = '';
      state.accessToken = '';
      StoreAccessToken.clean();
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
      StoreAccessToken.clean();
    });
  }
});

export const {
  setAccessToken,
  accountCleanup,
} = accountSlice.actions;

export default accountSlice.reducer;
