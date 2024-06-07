"use client";
import { configureStore } from "@reduxjs/toolkit";
import interfaceSlice from "./features/interfaceSlice";
import cartSlice from "./features/cartSlice";

const store = configureStore({
  reducer: {
    interface: interfaceSlice,
    cart: cartSlice,
  },
});
export type ReduxState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;
export default store;
