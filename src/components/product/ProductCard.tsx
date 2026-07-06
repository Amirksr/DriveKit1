"use client";

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
 * all-products/category grids. Handles its own wishlist toggle and
 * discount price display; the parent is only responsible for the actual
 * "add to cart" dispatch, which keeps this component reusable regardless
 * of where the cart action needs to be logged/analyzed.
 */
export default function ProductCard({
  product,
  onAddToCart,
  onHoverStart,
  onHoverEnd,
}: ProductCardProps) {
  const { wishlist, toggleWishlist } = useWishlist();
  const isWished = wishlist.includes(product.id);

  const originalPrice = parsePrice(product.price);
  const hasDiscount = (product.discount ?? 0) > 0;
  const finalPrice = applyDiscount(originalPrice, product.discount);

  const handleWishlistClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <motion.div
      className="group relative flex h-full flex-col rounded-2xl bg-white p-4 shadow-card transition-shadow hover:shadow-card-hover"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      {hasDiscount && (
        <span className="absolute end-3 top-3 z-10 rounded-full bg-brand-500 px-2 py-1 text-xs font-bold text-white">
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

      <h3 className="line-clamp-2 min-h-[2.75rem] text-sm font-semibold text-gray-800">
        {product.title}
      </h3>
      {product.car && <p className="mt-1 text-xs text-gray-500">{product.car}</p>}

      <div className="mt-2 flex flex-wrap items-baseline gap-2">
        {hasDiscount && (
          <span className="text-xs text-gray-400 line-through">
            {formatToman(originalPrice)}
          </span>
        )}
        <span className="text-sm font-bold text-brand-600">{formatToman(finalPrice)}</span>
      </div>

      <button
        type="button"
        onClick={() => onAddToCart(product)}
        disabled={!product.instock}
        className="mt-3 w-full rounded-lg bg-surmeh py-2 text-sm font-medium text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        {product.instock ? "افزودن به سبد خرید" : "ناموجود"}
      </button>
    </motion.div>
  );
}
