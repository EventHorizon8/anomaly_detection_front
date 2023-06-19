import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ClientsSliceInterface from "@/type/slice/ClientsSliceInterface";
import {loadClientList} from "@/store/clients/clients-thunks";
import ClientInterface from "@/type/ClientInterface";
import BeClientDataInterface from "@/type/BeData/BeClientDataInterface";

const initialClientsState: ClientsSliceInterface = {
  clientList: null,
};

const clientsSlice = createSlice({
  name: "clients",
  initialState: initialClientsState,
  reducers: {

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
  }
});

export const {

} = clientsSlice.actions;

export default clientsSlice.reducer;
