import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./slices/orders-slice";
import productsReducer from "./slices/products-slice";
import shipperReducer from "./slices/shipper-slice";
import customerReducer from "./slices/customer-slice";

export const store = configureStore({
  reducer: {
    Orders: ordersReducer,
    Products: productsReducer,
    Shipper: shipperReducer,
    Customer: customerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;