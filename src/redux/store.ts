import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

/** Root state type, inferred directly from the store so it can never drift out of sync with the reducers. */
export type RootState = ReturnType<typeof store.getState>;
/** Store dispatch type, including thunk support from Redux Toolkit's default middleware. */
export type AppDispatch = typeof store.dispatch;

export default store;
