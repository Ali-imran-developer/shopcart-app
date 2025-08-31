import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DashboardState {
  dashboardData: any;
}

const initialState: DashboardState = {
  dashboardData: {},
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardData: (state, action: PayloadAction<{ dashboardData: any }>) => {
      state.dashboardData = action.payload.dashboardData;
    },
  },
});

export const { setDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;