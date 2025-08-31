import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./slices/orders-slice";
import productsReducer from "./slices/products-slice";
import shipperReducer from "./slices/shipper-slice";
import customerReducer from "./slices/customer-slice";
import dashboardReducer from "./slices/dashboard-slice";

export const store = configureStore({
  reducer: {
    Orders: ordersReducer,
    Products: productsReducer,
    Shipper: shipperReducer,
    Customer: customerReducer,
    Dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;