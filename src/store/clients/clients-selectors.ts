import {RootState} from "@/store";

export const getClientList = (state: RootState) => {
  return state.clients.clientList;
}

export const getClientStats = (state: RootState) => {
  return state.clients.clientStats;
}

export const getClientStatsTimePeriod = (state: RootState) => {
  return state.clients.timePeriod;
}
