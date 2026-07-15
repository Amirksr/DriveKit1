"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/product";

export interface UseProductsOptions {
  category?: string;
  /** Multiple category labels/slugs at once — pass an empty array to force zero results (e.g. "search matched nothing"). */
  categories?: string[];
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  discountOnly?: boolean;
  /** Excludes discounted products — used by "new arrivals" style sections. */
  excludeDiscounted?: boolean;
  inStockOnly?: boolean;
  limit?: number;
  random?: boolean;
}

interface UseProductsResult {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Fetches products from `/api/products` on the client, re-running
 * whenever the given options change. Centralizing this in one hook keeps
 * every product-listing component (carousels, category grids, search
 * pages) consistent instead of hand-rolling `fetch` + `useEffect` in each.
 */
export function useProducts(options: UseProductsOptions = {}): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Serialize so the effect dependency array can use a stable primitive
  // instead of a new object reference on every render.
  const key = JSON.stringify(options);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        const opts: UseProductsOptions = JSON.parse(key);
        if (opts.category) params.set("category", opts.category);
        if (opts.categories !== undefined) params.set("categories", opts.categories.join(","));
        if (opts.search) params.set("search", opts.search);
        if (opts.minPrice !== undefined) params.set("minPrice", String(opts.minPrice));
        if (opts.maxPrice !== undefined) params.set("maxPrice", String(opts.maxPrice));
        if (opts.discountOnly) params.set("discount", "1");
        if (opts.excludeDiscounted) params.set("excludeDiscount", "1");
        if (opts.inStockOnly) params.set("inStock", "1");
        if (opts.limit !== undefined) params.set("limit", String(opts.limit));
        if (opts.random) params.set("random", "1");

        const response = await fetch(`/api/products?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("درخواست محصولات با خطا مواجه شد");
        const data: { products: Product[] } = await response.json();
        setProducts(data.products);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError((err as Error).message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [key]);

  return { products, isLoading, error };
}

export default useProducts;
