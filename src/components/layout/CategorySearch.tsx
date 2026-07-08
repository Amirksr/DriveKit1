"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { CATEGORY_LABELS } from "@/data/categories";

interface CategorySearchProps {
  /** Called after the user picks a result (used to close a modal/drawer). */
  onNavigate?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

/**
 * Live category search: as the user types, matching product categories
 * (and sub-categories) are shown in a dropdown so they can jump straight
 * to that listing page. Shared between the desktop search bar and the
 * mobile search overlay so both stay in sync.
 */
export default function CategorySearch({
  onNavigate,
  placeholder = "...جستجو",
  autoFocus = false,
  className = "",
}: CategorySearchProps) {
  const [query, setQuery] = useState("");

  const matches = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return [];
    return CATEGORY_LABELS.filter((label) => label.includes(trimmed)).slice(0, 8);
  }, [query]);

  const handleSelect = () => {
    setQuery("");
    onNavigate?.();
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full rounded-lg border border-gray-200 py-2 ps-4 pe-10 focus:border-brand-400 focus:outline-none"
      />
      <FaSearch className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-gray-400" />

      {matches.length > 0 && (
        <ul className="absolute start-0 top-full z-50 mt-1 w-full overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg">
          {matches.map((label) => (
            <li key={label}>
              <Link
                href={`/products/list?category=${encodeURIComponent(label)}`}
                onClick={handleSelect}
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {query.trim() && matches.length === 0 && (
        <div className="absolute start-0 top-full z-50 mt-1 w-full rounded-lg border border-gray-100 bg-white p-3 text-center text-sm text-gray-400 shadow-lg">
          نتیجه‌ای یافت نشد
        </div>
      )}
    </div>
  );
}
