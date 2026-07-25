"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaChevronDown, FaChevronUp, FaFilter } from "react-icons/fa";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import { useProducts } from "@/lib/useProducts";
import { useAddToCart } from "@/lib/useAddToCart";
import { parsePrice } from "@/lib/price";
import { CAR_OPTIONS, BRAND_OPTIONS } from "@/data/categories";

/**
 * `useSearchParams` opts the page into client-side rendering for the
 * segment that reads it; Next.js requires that segment to be wrapped in a
 * `<Suspense>` boundary so the rest of the route can still be prerendered.
 */
export default function ProductListPage() {
  return (
    <Suspense fallback={null}>
      <ProductListContent />
    </Suspense>
  );
}

function ProductListContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "همه محصولات";

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCar, setSelectedCar] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [discountOnly, setDiscountOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [carDropdownOpen, setCarDropdownOpen] = useState(false);
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const addToCart = useAddToCart();

  const resetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedCar("");
    setSelectedBrand("");
    setDiscountOnly(false);
    setInStockOnly(false);
    setCarDropdownOpen(false);
    setBrandDropdownOpen(false);
  };

  // Bug fix: the advanced filters (price range, car, brand, discount,
  // in-stock) used to be plain local state that persisted across
  // category changes. Since navigating to a different sub-category keeps
  // this same page component mounted (only the `category` search param
  // changes), those stale filter values were silently carrying over and
  // being applied to the new category's products. Resetting them
  // whenever `category` changes keeps each category's filters isolated.
  useEffect(() => {
    resetFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const { products, isLoading } = useProducts({
    category: category === "همه محصولات" ? undefined : category,
  });

  // Car/brand filters are applied client-side on top of the category
  // results returned by the API, since they're cheap to compute over a
  // single category's product list and don't need their own DB index.
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const numericPrice = parsePrice(product.price);
      if (minPrice && numericPrice < parsePrice(minPrice)) return false;
      if (maxPrice && numericPrice > parsePrice(maxPrice)) return false;
      if (selectedCar && product.car !== selectedCar) return false;
      if (selectedBrand && product.brand !== selectedBrand) return false;
      if (discountOnly && !(product.discount && product.discount > 0)) return false;
      if (inStockOnly && !product.instock) return false;
      return true;
    });
  }, [products, minPrice, maxPrice, selectedCar, selectedBrand, discountOnly, inStockOnly]);

  const filters = (
    <div className="rounded-xl border border-gray-100 p-4">
      <h5 className="font-bold text-gray-900">فیلتر محصولات</h5>
      <p className="mb-3 text-xs text-gray-400">فیلتر پیشرفته محصولات</p>

      <label className="mb-1 block text-sm text-gray-600">حداقل قیمت کالا (تومان)</label>
      <input
        type="text"
        inputMode="numeric"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="mb-3 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
      />

      <label className="mb-1 block text-sm text-gray-600">حداکثر قیمت کالا (تومان)</label>
      <input
        type="text"
        inputMode="numeric"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="mb-3 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
      />

      <div className="mb-3">
        <button
          type="button"
          onClick={() => setCarDropdownOpen((open) => !open)}
          className="flex w-full items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm"
        >
          فیلتر بر اساس نام خودرو {carDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {carDropdownOpen && (
          <div className="mt-1 max-h-48 overflow-y-auto rounded-lg border border-gray-100">
            {CAR_OPTIONS.map((car) => (
              <button
                key={car}
                onClick={() => {
                  setSelectedCar(car);
                  setCarDropdownOpen(false);
                }}
                className={`block w-full px-3 py-1.5 text-start text-sm hover:bg-gray-50 ${
                  selectedCar === car ? "bg-brand-50 font-semibold text-brand-600" : ""
                }`}
              >
                {car}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mb-3">
        <button
          type="button"
          onClick={() => setBrandDropdownOpen((open) => !open)}
          className="flex w-full items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm"
        >
          فیلتر بر اساس برند محصول {brandDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {brandDropdownOpen && (
          <div className="mt-1 max-h-48 overflow-y-auto rounded-lg border border-gray-100">
            {BRAND_OPTIONS.map((brand) => (
              <button
                key={brand}
                onClick={() => {
                  setSelectedBrand(brand);
                  setBrandDropdownOpen(false);
                }}
                className={`block w-full px-3 py-1.5 text-start text-sm hover:bg-gray-50 ${
                  selectedBrand === brand ? "bg-brand-50 font-semibold text-brand-600" : ""
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        )}
      </div>

      <label className="mb-2 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={discountOnly}
          onChange={(e) => setDiscountOnly(e.target.checked)}
          className="h-4 w-4 accent-brand-500"
        />
        محصولات تخفیف‌دار
      </label>
      <label className="mb-3 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
          className="h-4 w-4 accent-brand-500"
        />
        محصولات موجود
      </label>

      <button
        type="button"
        onClick={() => {
          resetFilters();
          setShowMobileFilters(false);
        }}
        className="w-full rounded-lg bg-red-500 py-2 text-sm font-semibold text-white hover:bg-red-600"
      >
        حذف فیلترها
      </button>
    </div>
  );

  return (
    <>
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-6">
        <p className="mb-4 text-sm text-gray-400">فروشگاه آدورا یدک &gt; {category}</p>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">{filters}</aside>

          <div className="lg:col-span-9">
            <button
              type="button"
              onClick={() => setShowMobileFilters(true)}
              className="mb-4 flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white lg:hidden"
            >
              <FaFilter /> فیلتر محصولات
            </button>

            {isLoading ? (
              <p className="py-10 text-center text-gray-400">در حال بارگذاری محصولات…</p>
            ) : filteredProducts.length === 0 ? (
              <p className="py-10 text-center text-gray-400">محصولی مطابق فیلتر یافت نشد.</p>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/40 lg:hidden">
          <div className="max-h-[85vh] w-full overflow-y-auto rounded-t-2xl bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <h5 className="font-bold">فیلتر محصولات</h5>
              <button onClick={() => setShowMobileFilters(false)} aria-label="بستن">
                ✕
              </button>
            </div>
            {filters}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
