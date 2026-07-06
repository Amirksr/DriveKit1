import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface WishlistState {
  /** IDs of products the user has marked as favorites. */
  items: string[];
}

const initialState: WishlistState = { items: [] };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    /** Adds a product ID to the wishlist, or removes it if already present. */
    toggleWishlist: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.items.includes(id)) {
        state.items = state.items.filter((itemId) => itemId !== id);
      } else {
        state.items.push(id);
      }
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
