"use client";

import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/slices/cartSlice";
import { applyDiscount, parsePrice } from "@/lib/price";
import type { Product } from "@/types/product";

/**
 * Returns a function that dispatches `addToCart` for a given catalogue
 * product, taking care of discount math so every call site (product
 * grids, carousels, category pages) prices items consistently.
 */
export function useAddToCart() {
  const dispatch = useAppDispatch();

  return (product: Product) => {
    const finalPrice = applyDiscount(parsePrice(product.price), product.discount);
    dispatch(
      addToCart({
        id: product.id,
        name: product.title,
        price: finalPrice,
        image: product.imageUrl,
        inStock: product.instock,
      })
    );
  };
}

export default useAddToCart;
