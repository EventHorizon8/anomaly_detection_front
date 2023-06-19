import {createSlice} from "@reduxjs/toolkit";
import LogsSliceInterface from "@/type/slice/LogsSliceInterface";
import {loadClientLogsByDateTime, loadEarlierClientLogs, loadOlderClientLogs} from "@/store/logs/logs-thunks";

const initialLogsState: LogsSliceInterface = {
  clientId: null,
  dateTime: null,
  logs: null,
  isLoading: false,
};

const logsSlice = createSlice({
  name: "clients",
  initialState: initialLogsState,
  reducers: {
    // cleanAllLogs: (state) => {
    //   state.clientId = null;
    //   state.dateTime = null;
    //   state.logs = null;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(loadClientLogsByDateTime.pending, (state) => {
      state.clientId = null;
      state.dateTime = null;
      state.logs = null;
      state.isLoading = true;
    });
    builder.addCase(loadClientLogsByDateTime.fulfilled, (state, { payload }) => {
      const {
        clientId,
        dateTime,
        logs
      } = payload;
      state.clientId = clientId;
      state.dateTime = dateTime;
      state.logs = logs;
      state.isLoading = false;
    });


    builder.addCase(loadEarlierClientLogs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadEarlierClientLogs.fulfilled, (state, { payload }) => {
      const {
        clientId,
        earlierLogs,
      } = payload;
      state.clientId = clientId;
      state.logs = [
        ...earlierLogs,
        ...(state.logs || []),
      ];
      state.isLoading = false;
    });

    builder.addCase(loadOlderClientLogs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadOlderClientLogs.fulfilled, (state, { payload }) => {
      const {
        clientId,
        olderLogs,
      } = payload;
      state.clientId = clientId;
      state.logs = [
        ...(state.logs || []),
        ...olderLogs,
      ];
      state.isLoading = false;
    });
  }
});

export const {

} = logsSlice.actions;

export default logsSlice.reducer;
