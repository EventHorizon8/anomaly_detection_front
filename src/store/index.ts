import {combineReducers} from "redux";
import accountSlice from "./account/account-slice";
import {configureStore} from "@reduxjs/toolkit";

const reducerList = combineReducers({
  account: accountSlice,
});

export const store = configureStore({
  reducer: reducerList,
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
