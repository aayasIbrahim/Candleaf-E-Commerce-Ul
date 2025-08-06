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
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   cart: [],
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const item = state.cart.find(p => p.id === action.payload.id);
//       if (item) {
//         item.quantity += 1;
//       } else {
//         state.cart.push({ ...action.payload, quantity: 1 });
//       }
//     },
//     increment: (state, action) => {
//       const item = state.cart.find(p => p.id === action.payload);
//       if (item) item.quantity += 1;
//     },
//     decrement: (state, action) => {
//       const item = state.cart.find(p => p.id === action.payload);
//       if (item && item.quantity > 1) item.quantity -= 1;
//     },
//   },
// });

// export const { addToCart, increment, decrement } = cartSlice.actions;
// export default cartSlice.reducer;
