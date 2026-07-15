"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

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
  const [showBackToTop, setShowBackToTop] = useState(false);
  const addToCart = useAddToCart();

  const filterButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Click-and-drag scrolling for the category strip, so it can be
  // scrolled with a mouse (not just touch) — e.g. when a desktop browser
  // window is simply resized down to mobile width, where there's no
  // touch input and the scrollbar itself is intentionally hidden.
  const dragState = useRef({ isDown: false, startX: 0, startScrollLeft: 0, moved: false });

  const handlePointerDown = (event: React.MouseEvent) => {
    const el = scrollerRef.current;
    if (!el) return;
    dragState.current = {
      isDown: true,
      startX: event.pageX,
      startScrollLeft: el.scrollLeft,
      moved: false,
    };
  };

  const handlePointerMove = (event: React.MouseEvent) => {
    const el = scrollerRef.current;
    const drag = dragState.current;
    if (!el || !drag.isDown) return;
    const delta = event.pageX - drag.startX;
    if (Math.abs(delta) > 4) drag.moved = true;
    el.scrollLeft = drag.startScrollLeft - delta;
  };

  const endDrag = () => {
    dragState.current.isDown = false;
  };

  const categories = useMemo(() => [ALL_LABEL, ...CATEGORY_LABELS], []);

  // The category whose name the current search text matches, if any —
  // used to highlight and auto-scroll that button in the filter strip so
  // typing a category name visually syncs with the row below the search
  // box, the same way the original project's search worked.
  const searchMatchedCategory = useMemo(() => {
    const query = search.trim();
    if (!query) return null;
    return CATEGORY_LABELS.find((label) => label.includes(query)) ?? null;
  }, [search]);

  useEffect(() => {
    if (!searchMatchedCategory) return;
    filterButtonRefs.current[searchMatchedCategory]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [searchMatchedCategory]);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { products, isLoading, error } = useProducts({
    search: search.trim() || undefined,
    category: !search.trim() && activeFilter !== ALL_LABEL ? activeFilter : undefined,
  });

  const handleFilterClick = (category: string) => {
    // A drag that moved the strip shouldn't also register as picking
    // whichever button the cursor happened to release over.
    if (dragState.current.moved) return;
    setActiveFilter(category);
    setSearch("");
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

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

          {/* Category filter strip: a horizontally scrollable row on
              mobile (matching the original project), wraps normally from
              the `sm` breakpoint up. Also drag-scrollable with the mouse. */}
          <div className="relative">
            <div
              ref={scrollerRef}
              onMouseDown={handlePointerDown}
              onMouseMove={handlePointerMove}
              onMouseUp={endDrag}
              onMouseLeave={endDrag}
              className="no-scrollbar flex cursor-grab gap-2 overflow-x-auto whitespace-nowrap active:cursor-grabbing sm:cursor-auto sm:flex-wrap sm:overflow-visible sm:whitespace-normal"
            >
              {categories.map((cat) => {
                const isActive =
                  (activeFilter === cat && !search) || cat === searchMatchedCategory;
                return (
                  <button
                    key={cat}
                    ref={(el) => {
                      filterButtonRefs.current[cat] = el;
                    }}
                    onClick={() => handleFilterClick(cat)}
                    className={`shrink-0 select-none rounded-full border px-3 py-1.5 text-sm transition-colors ${
                      isActive
                        ? "border-brand-500 bg-brand-500 text-white"
                        : "border-gray-200 text-gray-600 hover:border-brand-300"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            {/* Edge fade hints that the strip scrolls horizontally, mobile-only. */}
            <div className="pointer-events-none absolute inset-y-0 start-0 w-8 bg-gradient-to-r from-white to-transparent sm:hidden" />
            <div className="pointer-events-none absolute inset-y-0 end-0 w-8 bg-gradient-to-l from-white to-transparent sm:hidden" />
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

      {/* Back-to-top button — same style/behavior as the original project:
          amber circle, bottom-right, fades in after scrolling 300px. */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="بازگشت به بالا"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-[999] grid h-[3.2rem] w-[3.2rem] place-items-center rounded-full bg-[#d79f21] text-white shadow-lg transition-colors hover:bg-[#b37f19]"
          >
            <FaArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

