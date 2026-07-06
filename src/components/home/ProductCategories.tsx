"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { HOME_CATEGORIES } from "@/data/homeCategories";

/**
 * Horizontal shortcut list of top-level part categories. Renders as an
 * auto-playing Swiper on small screens and a static grid on larger ones,
 * matching the original responsive behavior without needing a manual
 * `window.innerWidth` listener (Tailwind's `lg:` breakpoint handles it
 * declaratively via CSS instead).
 */
export default function ProductCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h4 className="mb-4 text-center text-lg font-bold text-gray-900 lg:hidden">
        دسته‌بندی محصولات
      </h4>

      <div className="flex items-center gap-6">
        <h4 className="hidden shrink-0 text-lg font-bold text-gray-900 lg:block">
          <span className="text-brand-500">دسته‌بندی</span> محصولات
        </h4>

        {/* Mobile / tablet: swipeable row */}
        <div className="w-full lg:hidden">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={3}
            spaceBetween={10}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop
            breakpoints={{ 576: { slidesPerView: 3 }, 768: { slidesPerView: 4 } }}
          >
            {HOME_CATEGORIES.map((cat) => (
              <SwiperSlide key={cat.title}>
                <CategoryTile title={cat.title} icon={cat.icon} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop: static grid */}
        <div className="hidden w-full grid-cols-4 gap-4 lg:grid xl:grid-cols-8">
          {HOME_CATEGORIES.map((cat) => (
            <CategoryTile key={cat.title} title={cat.title} icon={cat.icon} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryTile({
  title,
  icon,
}: {
  title: string;
  icon: (typeof HOME_CATEGORIES)[number]["icon"];
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl p-3 text-center transition-colors hover:bg-brand-50">
      <Image src={icon} alt={title} width={56} height={56} className="object-contain" />
      <span className="text-xs font-medium text-gray-700">{title}</span>
    </div>
  );
}
