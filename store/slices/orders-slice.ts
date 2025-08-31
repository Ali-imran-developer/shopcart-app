import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrdersState {
  orders: any[];
  totalOrders: number;
  totalPages: number;
}

const initialState: OrdersState = {
  orders: [],
  totalOrders: 0,
  totalPages: 0,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<{ orders: any[]; totalOrders: number; totalPages: number; }>) => {
      state.orders = action.payload.orders;
      state.totalOrders = action.payload.totalOrders;
      state.totalPages = action.payload.totalPages;
    },
  },
});

export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;