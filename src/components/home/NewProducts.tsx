"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import ProductCard from "@/components/product/ProductCard";
import { useProducts } from "@/lib/useProducts";
import { useAddToCart } from "@/lib/useAddToCart";

/** Homepage carousel showcasing a random sample of in-stock, non-discounted products. */
export default function NewProducts() {
  const { products, isLoading } = useProducts({
    inStockOnly: true,
    random: true,
    limit: 8,
  });
  const addToCart = useAddToCart();
  const swiperRef = useRef<SwiperType | null>(null);

  const stopAutoplay = () => swiperRef.current?.autoplay?.stop();
  const startAutoplay = () => swiperRef.current?.autoplay?.start();

  if (!isLoading && products.length === 0) return null;

  return (
    <section className="relative py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">جدیدترین محصولات</h3>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="اسلاید قبلی"
              onClick={() => swiperRef.current?.slidePrev()}
              className="grid h-9 w-9 place-items-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="اسلاید بعدی"
              onClick={() => swiperRef.current?.slideNext()}
              className="grid h-9 w-9 place-items-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              ›
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          spaceBetween={16}
          breakpoints={{
            0: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="pb-10"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard
                product={product}
                onAddToCart={addToCart}
                onHoverStart={stopAutoplay}
                onHoverEnd={startAutoplay}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
