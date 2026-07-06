"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleWishlist } from "@/redux/slices/wishlistSlice";

/** Convenience hook exposing the wishlist's product IDs and a toggle function. */
export function useWishlist() {
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const dispatch = useAppDispatch();

  const toggle = (productId: string) => {
    dispatch(toggleWishlist(productId));
  };

  return { wishlist, toggleWishlist: toggle };
}

export default useWishlist;
