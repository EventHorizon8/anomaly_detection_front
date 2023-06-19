import {RootState} from "@/store";

export const getLogs = (state: RootState) => {
  return state.logs.logs;
}

export const getLogsClientId = (state: RootState) => {
  return state.logs.clientId;
}

export const getLogsDateTime = (state: RootState) => {
  return state.logs.dateTime;
}

export const getLogsAreLoading = (state: RootState) => {
  return state.logs.isLoading;
}
