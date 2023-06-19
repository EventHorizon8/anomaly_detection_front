import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import ClientsSliceInterface from "@/type/slice/ClientsSliceInterface";
import {loadClientList, loadClientStats} from "@/store/clients/clients-thunks";
import ClientInterface from "@/type/ClientInterface";
import BeClientDataInterface from "@/type/BeData/BeClientDataInterface";
import {ClientStatsInterface} from "@/type/ClientStatsInterface";

const initialClientsState: ClientsSliceInterface = {
  timePeriod: 30 * 60,
  clientList: null,
  clientStats: {},
};

const clientsSlice = createSlice({
  name: "clients",
  initialState: initialClientsState,
  reducers: {
    cleanAllStats: (state) => {
      state.clientStats = {};
    },
    setTimePeriod: (
      state,
      { payload }: PayloadAction<{timePeriod: number}>
    ) => {
      state.timePeriod = payload.timePeriod;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loadClientList.pending, (state) => {
      state.clientList = null;
    });
    builder.addCase(loadClientList.fulfilled, (state, { payload }) => {
      state.clientList = payload.clientList.map((clientData:  BeClientDataInterface): ClientInterface => (
        {
          id: clientData.id,
          active: !clientData.active,
          name: clientData.name,
          hostname: clientData.hostname,
          type: clientData.type,
          accessToken: clientData.access_token,
        }
      ))
    });

    builder.addCase(loadClientStats.fulfilled, (state, { payload }) => {
      console.log(payload);
      payload.forEach(({ clientId, stats}: { clientId: number, stats: ClientStatsInterface}) => {
        state.clientStats[clientId] = stats;
      })
    });
  }
});

export const {
  cleanAllStats,
  setTimePeriod,
} = clientsSlice.actions;

export default clientsSlice.reducer;
