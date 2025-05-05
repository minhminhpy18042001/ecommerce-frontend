import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/auth/userReducer";
import {productsReducer}from "./features/products/productsReducer";


export default configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
  },
});

// HOST
export const server = "https://ecommerce-v1-wswg.onrender.com/api/v1";
