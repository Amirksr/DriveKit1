"use client";

import { useMemo, useState } from "react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import { useProducts } from "@/lib/useProducts";
import { useAddToCart } from "@/lib/useAddToCart";
import { CATEGORY_LABELS } from "@/data/categories";

const ALL_LABEL = "همه";

export default function AllProductsPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState(ALL_LABEL);
  const addToCart = useAddToCart();

  const categories = useMemo(() => [ALL_LABEL, ...CATEGORY_LABELS], []);

  const { products, isLoading, error } = useProducts({
    search: search.trim() || undefined,
    category: !search.trim() && activeFilter !== ALL_LABEL ? activeFilter : undefined,
  });

  const handleFilterClick = (category: string) => {
    setActiveFilter(category);
    setSearch("");
  };

  return (
    <>
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">لیست محصولات</h1>

        <div className="mb-6 flex flex-col gap-4">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="جستجو در محصولات..."
            className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand-400 focus:outline-none md:max-w-md"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterClick(cat)}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  activeFilter === cat && !search
                    ? "border-brand-500 bg-brand-500 text-white"
                    : "border-gray-200 text-gray-600 hover:border-brand-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

        {isLoading ? (
          <p className="py-10 text-center text-gray-400">در حال بارگذاری محصولات…</p>
        ) : products.length === 0 ? (
          <p className="py-10 text-center text-gray-400">محصولی یافت نشد.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
