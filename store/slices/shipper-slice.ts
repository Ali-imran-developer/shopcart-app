import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShipperState {
  shipper: any[];
  totalShippers: number;
  totalPages: number;
}

const initialState: ShipperState = {
  shipper: [],
  totalShippers: 0,
  totalPages: 0,
};

const shipperSlice = createSlice({
  name: "shippers",
  initialState,
  reducers: {
    setShippers: (state, action: PayloadAction<{ shipper: any[]; totalShippers: number; totalPages: number; }>) => {
      state.shipper = action.payload.shipper;
      state.totalShippers = action.payload.totalShippers;
      state.totalPages = action.payload.totalPages;
    },
  },
});

export const { setShippers } = shipperSlice.actions;
export default shipperSlice.reducer;