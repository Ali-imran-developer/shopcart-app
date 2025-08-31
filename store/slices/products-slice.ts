import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductsState {
  products: any[];
  totalProducts: number;
  totalPages: number;
}

const initialState: ProductsState = {
  products: [],
  totalProducts: 0,
  totalPages: 0,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<{ products: any[]; totalProducts: number; totalPages: number; }>) => {
      state.products = action.payload.products;
      state.totalProducts = action.payload.totalProducts;
      state.totalPages = action.payload.totalPages;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;