import { createReducer } from "@reduxjs/toolkit";
const server='https://ecommerce-v1-wswg.onrender.com/api/v1'

const initialState = {
  loading: false,
  products: [],
  error: null,
  message: null,
  product: {},
};

export const productsReducer = createReducer(initialState, (builder) => {
  builder.addCase("fetchProductsRequest", (state) => {
    state.loading = true;
  });
  builder.addCase("fetchProductsSuccess", (state, action) => {
    state.loading = false;
    state.products = action.payload;
  });
  builder.addCase("fetchProductsFail", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  builder.addCase("clearError", (state) => {
    state.error = null;
  });
  builder.addCase("clearMessage", (state) => {
    state.message = null;
  });
  builder.addCase("fetchProductByIdSuccess", (state, action) => {
    state.loading = false;
    state.product = action.payload;
  });
  builder.addCase("fetchProductByIdFail", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  builder.addCase("fetchProductByIdRequest", (state) => {
    state.loading = true;
  });
});