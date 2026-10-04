import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
  isWishlistOpen: false,
  isProfileOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    openWishlist: (state) => {
      state.isWishlistOpen = true;
    },
    closeWishlist: (state) => {
      state.isWishlistOpen = false;
    },
    openProfile: (state) => {
      state.isProfileOpen = true;
    },
    closeProfile: (state) => {
      state.isProfileOpen = false;
    },
  },
});
export const {
  openCart,
  closeCart,
  toggleCart,
  openWishlist,
  closeWishlist,
  openProfile,
  closeProfile,
} = uiSlice.actions;
export default uiSlice.reducer;
