import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/types/product";

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

/** Payload for adding a product to the cart — everything except `quantity`, which the reducer manages. */
export type AddToCartPayload = Omit<CartItem, "quantity">;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /** Adds a product to the cart, or increments its quantity if it's already present. */
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },

    /** Increments the quantity of an existing cart line by one. */
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((entry) => entry.id === action.payload);
      if (item) item.quantity += 1;
    },

    /**
     * Decrements the quantity of an existing cart line by one. If the
     * quantity would drop to zero, the item is removed from the cart
     * entirely instead of being left at `0`.
     */
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((entry) => entry.id === action.payload);
      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((entry) => entry.id !== action.payload);
      }
    },

    /** Removes a product from the cart regardless of its current quantity. */
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    /** Empties the cart. Handy after a successful checkout. */
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
