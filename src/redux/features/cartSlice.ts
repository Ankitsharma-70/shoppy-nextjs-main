import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  coupon: CouponCode | undefined;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    coupon: undefined,
  } as CartState,
  reducers: {
    applyCoupon: (state, action) => {
      state.coupon = action.payload;
    },
  },
});
export const { applyCoupon } = cartSlice.actions;
export default cartSlice.reducer;
