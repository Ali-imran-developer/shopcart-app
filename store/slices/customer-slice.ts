import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CustomerState {
  customer: any[];
  totalCustomers: number;
  totalPages: number;
}

const initialState: CustomerState = {
  customer: [],
  totalCustomers: 0,
  totalPages: 0,
};

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setCustomers: (state, action: PayloadAction<{ customer: any[]; totalCustomers: number; totalPages: number; }>) => {
      state.customer = action.payload.customer;
      state.totalCustomers = action.payload.totalCustomers;
      state.totalPages = action.payload.totalPages;
    },
  },
});

export const { setCustomers } = customerSlice.actions;
export default customerSlice.reducer;