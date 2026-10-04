import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../store/cartSlice";
import uiReducer from "../store/uiSlice";
import wishlistReducer from "../store/wishlistSlice";
import authReducer from "../store/authSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    ui: uiReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
  },
});
