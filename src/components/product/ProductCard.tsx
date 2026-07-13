"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { formatToman, parsePrice, applyDiscount } from "@/lib/price";
import { useWishlist } from "@/lib/useWishlist";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  /** Optional autoplay pause/resume callbacks, wired up when the card sits inside a Swiper carousel. */
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

/**
 * A single product tile used across the homepage carousels and the
 * all-products/category grids. Every section of the card below the image
 * reserves a fixed height up front (title, car name, price block) so that:
 *   1. Expanding a multi-line title on hover/click never pushes down the
 *      rest of the card or neighboring cards — the expanded title is
 *      rendered as an absolutely-positioned overlay on top of the
 *      reserved space instead of growing it.
 *   2. Cards without a discount reserve the same vertical space the
 *      strikethrough price would take (just hidden via `invisible`), so
 *      every card in a row lines up — image, title, price, and button
 *      all sit at the same height across neighboring cards regardless of
 *      whether that particular product happens to be on sale.
 */
export default function ProductCard({
  product,
  onAddToCart,
  onHoverStart,
  onHoverEnd,
}: ProductCardProps) {
  const { wishlist, toggleWishlist } = useWishlist();
  const isWished = wishlist.includes(product.id);
  const [isTitleOpen, setIsTitleOpen] = useState(false);

  const originalPrice = parsePrice(product.price);
  const hasDiscount = (product.discount ?? 0) > 0;
  const finalPrice = applyDiscount(originalPrice, product.discount);

  const handleWishlistClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleTitleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsTitleOpen((open) => !open);
  };

  return (
    <motion.div
      className="group relative flex h-full flex-col rounded-2xl bg-white p-3 shadow-card transition-shadow hover:shadow-card-hover sm:p-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      {hasDiscount && (
        <span className="absolute end-3 top-3 z-10 rounded-full bg-brand-500 px-2 py-1 text-[10px] font-bold text-white sm:text-xs">
          %{product.discount}
        </span>
      )}

      <button
        type="button"
        onClick={handleWishlistClick}
        aria-label={isWished ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
        className="absolute start-3 top-3 z-10 rounded-full bg-white/90 p-2 shadow-sm transition-transform hover:scale-110"
      >
        {isWished ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="text-gray-400" />
        )}
      </button>

      <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-xl bg-gray-50">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 45vw, 220px"
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col items-center text-center">
        {/* Title: reserved to exactly one line; expands as a floating
            overlay on hover instead of growing this box, so it never
            shifts the price/button below or neighboring cards. Falls
            back to tap-to-toggle on touch devices, which have no hover. */}
        <div
          className="relative mb-1 h-8 w-full sm:h-9"
          onMouseEnter={() => setIsTitleOpen(true)}
          onMouseLeave={() => setIsTitleOpen(false)}
        >
          <h3
            onClick={handleTitleClick}
            className={`absolute inset-x-0 top-0 cursor-default text-xs font-semibold text-gray-800 sm:text-sm ${
              isTitleOpen
                ? "z-20 rounded-lg bg-white p-1.5 text-start shadow-lg"
                : "truncate"
            }`}
          >
            {product.title}
          </h3>
        </div>

        {/* Car name: reserved height even when a product has none, so this row's height is identical across every card. */}
        <p className="mb-1 h-4 w-full truncate text-[11px] text-gray-500 sm:text-xs">
          {product.car || "\u00A0"}
        </p>

        {/* Price block: always reserves two lines. The strikethrough line
            is only hidden (not removed) when there's no discount, via
            `invisible`, so non-discounted cards keep the exact same
            height as discounted ones. */}
        <div className="mb-2 flex w-full flex-col items-center gap-0.5">
          <span
            className={`text-[11px] text-gray-400 line-through sm:text-xs ${
              hasDiscount ? "" : "invisible"
            }`}
          >
            {formatToman(originalPrice)}
          </span>
          <span className="text-sm font-bold text-brand-600 sm:text-base">
            {formatToman(finalPrice)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onAddToCart(product)}
          disabled={!product.instock}
          className="mt-auto w-full rounded-lg bg-surmeh py-2 text-xs font-medium text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-gray-300 sm:text-sm"
        >
          {product.instock ? "افزودن به سبد خرید" : "ناموجود"}
        </button>
      </div>
    </motion.div>
  );
}
