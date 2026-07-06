import cartReducer, {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  clearCart,
  type CartState,
} from "@/redux/slices/cartSlice";
import type { AddToCartPayload } from "@/redux/slices/cartSlice";

const product: AddToCartPayload = {
  id: "brake-pad-1",
  name: "لنت ترمز جلو پژو ۲۰۶",
  price: 250000,
  image: "/assets/products-list/brake-pad/1.jpg",
  inStock: true,
};

function getInitialState(): CartState {
  return { items: [] };
}

describe("cartSlice", () => {
  it("returns the initial state", () => {
    expect(cartReducer(undefined, { type: "unknown" })).toEqual({ items: [] });
  });

  it("adds a new product to an empty cart with quantity 1", () => {
    const state = cartReducer(getInitialState(), addToCart(product));
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toMatchObject({ ...product, quantity: 1 });
  });

  it("increments the quantity when adding a product already in the cart", () => {
    let state = cartReducer(getInitialState(), addToCart(product));
    state = cartReducer(state, addToCart(product));
    expect(state.items).toHaveLength(1);
    expect(state.items[0]!.quantity).toBe(2);
  });

  it("increaseQuantity bumps an existing line item's quantity by one", () => {
    let state = cartReducer(getInitialState(), addToCart(product));
    state = cartReducer(state, increaseQuantity(product.id));
    expect(state.items[0]!.quantity).toBe(2);
  });

  it("increaseQuantity is a no-op for a product not in the cart", () => {
    const state = cartReducer(getInitialState(), increaseQuantity("nonexistent"));
    expect(state.items).toHaveLength(0);
  });

  it("decreaseQuantity reduces quantity by one when above 1", () => {
    let state = cartReducer(getInitialState(), addToCart(product));
    state = cartReducer(state, addToCart(product)); // quantity: 2
    state = cartReducer(state, decreaseQuantity(product.id));
    expect(state.items[0]!.quantity).toBe(1);
  });

  it("decreaseQuantity removes the item entirely once quantity reaches 0", () => {
    let state = cartReducer(getInitialState(), addToCart(product)); // quantity: 1
    state = cartReducer(state, decreaseQuantity(product.id));
    expect(state.items).toHaveLength(0);
  });

  it("removeFromCart removes the item regardless of quantity", () => {
    let state = cartReducer(getInitialState(), addToCart(product));
    state = cartReducer(state, addToCart(product)); // quantity: 2
    state = cartReducer(state, removeFromCart(product.id));
    expect(state.items).toHaveLength(0);
  });

  it("clearCart empties the cart", () => {
    let state = cartReducer(getInitialState(), addToCart(product));
    state = cartReducer(state, clearCart());
    expect(state.items).toEqual([]);
  });
});
