import {combineReducers} from "redux";
import accountSlice from "./account/account-slice";
import clientsSlice from "./clients/clients-slice";
import logsSlice from "./logs/logs-slice";
import {configureStore} from "@reduxjs/toolkit";

const reducerList = combineReducers({
  account: accountSlice,
  clients: clientsSlice,
  logs: logsSlice,
});

export const store = configureStore({
  reducer: reducerList,
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
