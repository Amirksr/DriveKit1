"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import ProductCard from "@/components/product/ProductCard";
import { useProducts } from "@/lib/useProducts";
import { useAddToCart } from "@/lib/useAddToCart";

/**
 * Carousel of discounted products. The original implementation had its
 * own bespoke `OfferCard` component that duplicated ~90% of
 * `ProductCard`'s markup; this version reuses `ProductCard` directly so
 * discount styling, wishlist behavior, and add-to-cart logic only exist
 * in one place.
 */
export default function SpecialOffers() {
  const { products } = useProducts({ discountOnly: true, random: true, limit: 30 });
  const addToCart = useAddToCart();
  const swiperRef = useRef<SwiperType | null>(null);
  const [slidesPerView, setSlidesPerView] = useState(4);

  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      if (width < 768) setSlidesPerView(2);
      else if (width < 992) setSlidesPerView(3);
      else setSlidesPerView(4);
    };
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const stopAutoplay = () => swiperRef.current?.autoplay?.stop();
  const startAutoplay = () => swiperRef.current?.autoplay?.start();

  if (products.length === 0) return null;

  return (
    <section className="relative bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">پیشنهادهای ویژه</h3>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="اسلاید قبلی"
              onClick={() => swiperRef.current?.slidePrev()}
              className="grid h-9 w-9 place-items-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="اسلاید بعدی"
              onClick={() => swiperRef.current?.slideNext()}
              className="grid h-9 w-9 place-items-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
            >
              ›
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={16}
          slidesPerView={slidesPerView}
          loop={products.length >= slidesPerView}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="pb-10"
        >
          {products.map((product, index) => (
            <SwiperSlide key={`${product.id}-${index}`}>
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
