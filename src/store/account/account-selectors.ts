import {RootState} from "@/store";

export const isAccountLoggedIn = (state: RootState): boolean => {
  return !!(state.account.accessToken && state.account.id);
}

export const getAccountAccessToken = (state: RootState): string|null => {
  return state.account.accessToken;
}

export const getAccountData = (state: RootState) => {
  return state.account;
}

export const getAccessToken = (state: RootState) => {
  return state.account.accessToken;
}
