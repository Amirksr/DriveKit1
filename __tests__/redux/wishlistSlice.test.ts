import wishlistReducer, { toggleWishlist } from "@/redux/slices/wishlistSlice";

describe("wishlistSlice", () => {
  it("returns the initial state", () => {
    expect(wishlistReducer(undefined, { type: "unknown" })).toEqual({ items: [] });
  });

  it("adds a product id when it is not already in the wishlist", () => {
    const state = wishlistReducer({ items: [] }, toggleWishlist("brake-pad-1"));
    expect(state.items).toEqual(["brake-pad-1"]);
  });

  it("removes a product id when it is already in the wishlist", () => {
    const state = wishlistReducer(
      { items: ["brake-pad-1"] },
      toggleWishlist("brake-pad-1")
    );
    expect(state.items).toEqual([]);
  });

  it("keeps other ids untouched when toggling one entry", () => {
    const state = wishlistReducer(
      { items: ["a", "b"] },
      toggleWishlist("c")
    );
    expect(state.items).toEqual(["a", "b", "c"]);
  });
});
