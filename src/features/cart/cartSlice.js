import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (!existingItem) {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },

    increment(state, action) {
      const item = state.cartItems.find((item) => item.id === action.payload); //

      if (item) {
        item.quantity += 1;
        item.total = item.quantity * item.price;
        state.totalQuantity += 1;
        state.totalPrice += item.price;
      }
    },

    decrement(state, action) {
      const item = state.cartItems.find((item) => item.id === action.payload); //

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.total = item.quantity * item.price;
        state.totalQuantity -= 1;
        state.totalPrice -= item.price;
      }
    },
  },
});

export const { addToCart, increment, decrement } = cartSlice.actions;
export default cartSlice.reducer;
