import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./slices/orders-slice";
import productsReducer from "./slices/products-slice";

export const store = configureStore({
  reducer: {
    Orders: ordersReducer,
    Products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;