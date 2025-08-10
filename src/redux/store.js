
import { configureStore } from '@reduxjs/toolkit';
import cartReducers from '../features/cart/cartSlice';
import { firebaseApiSlice } from '../features/firebaseApi/firebaseApiSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducers,
    [firebaseApiSlice.reducerPath]:firebaseApiSlice.reducer, // Add firebaseApiSlice reducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(firebaseApiSlice.middleware), // Add firebaseApiSlice middleware
});
