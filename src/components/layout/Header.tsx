"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaSearch,
  FaList,
  FaHome,
  FaBoxOpen,
  FaInfoCircle,
  FaPhone,
  FaBlog,
  FaUser,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaChevronLeft,
  FaChevronDown,
} from "react-icons/fa";

import { NAV_CATEGORIES } from "@/data/categories";
import { useAppSelector } from "@/redux/hooks";

const NAV_LINKS = [
  { href: "/", label: "صفحه اصلی", icon: FaHome },
  { href: "/track-order", label: "پیگیری سفارش", icon: FaBoxOpen },
  { href: "/about", label: "درباره ما", icon: FaInfoCircle },
  { href: "/contact", label: "تماس با ما", icon: FaPhone },
  { href: "/blog", label: "بلاگ", icon: FaBlog },
];

/**
 * Site header with a desktop mega-menu (category list + expandable
 * sub-categories) and a mobile drawer. Built with plain Tailwind + Framer
 * Motion instead of react-bootstrap's Offcanvas/Modal, removing the
 * Bootstrap dependency entirely.
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [mobileActiveCategory, setMobileActiveCategory] = useState<number | null>(null);

  const cartItems = useAppSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setActiveCategory(null);
    setIsMobileDrawerOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        {/* Desktop */}
        <div className="hidden md:block">
          <div className="flex items-center gap-6 py-4">
            <Link href="/" className="shrink-0 text-xl font-extrabold text-brand-600">
              ADORA YADAK
            </Link>
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="...جستجو"
                className="w-full rounded-lg border border-gray-200 py-2 ps-4 pe-10 focus:border-brand-400 focus:outline-none"
              />
              <FaSearch className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <Link href="/cart" className="relative rounded-full bg-gray-100 p-3 hover:bg-gray-200">
              <FaShoppingCart />
              {totalQuantity > 0 && (
                <span className="absolute -end-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-brand-500 text-[10px] font-bold text-white">
                  {totalQuantity}
                </span>
              )}
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200"
            >
              <FaUser /> ورود/ ثبت‌نام
            </Link>
          </div>

          <nav className="flex items-center gap-6 pb-3 text-sm font-medium text-gray-700">
            <div
              className="relative"
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <button type="button" className="flex items-center gap-2">
                <FaList /> دسته‌بندی‌ها
                <FaChevronDown
                  className={`transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute start-0 top-full z-50 flex w-[640px] rounded-xl border border-gray-100 bg-white shadow-xl"
                  >
                    <ul className="w-56 border-e border-gray-100 py-2">
                      {NAV_CATEGORIES.map((cat, idx) => (
                        <li
                          key={cat.name}
                          onMouseEnter={() => setActiveCategory(idx)}
                          className={`flex cursor-default items-center justify-between px-4 py-2 text-sm hover:bg-brand-50 ${
                            activeCategory === idx ? "bg-brand-50 font-semibold" : ""
                          }`}
                        >
                          <span>{cat.name}</span>
                          {cat.sub && <FaChevronLeft className="text-xs text-gray-400" />}
                        </li>
                      ))}
                    </ul>
                    <div className="flex-1 p-4">
                      {activeCategory !== null && NAV_CATEGORIES[activeCategory]?.sub && (
                        <ul className="grid grid-cols-2 gap-2">
                          {NAV_CATEGORIES[activeCategory].sub!.map((subItem) => (
                            <li key={subItem}>
                              <Link
                                href={`/products/list?category=${encodeURIComponent(subItem)}`}
                                onClick={closeAllMenus}
                                className="block rounded-md px-2 py-1 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-600"
                              >
                                {subItem}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {NAV_LINKS.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className="flex items-center gap-1 hover:text-brand-600">
                <Icon /> {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile */}
        <div className="flex items-center justify-between py-3 md:hidden">
          <Link href="/" className="text-lg font-extrabold text-brand-600">
            ADORA YADAK
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/cart" className="relative rounded-full bg-gray-100 p-2.5">
              <FaShoppingCart />
              {totalQuantity > 0 && (
                <span className="absolute -end-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-brand-500 text-[9px] font-bold text-white">
                  {totalQuantity}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(true)}
              aria-label="باز کردن منو"
              className="rounded-full bg-gray-100 p-2.5"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileDrawerOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 end-0 z-50 w-72 overflow-y-auto bg-white p-4 shadow-2xl md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-bold">منو</span>
                <button onClick={() => setIsMobileDrawerOpen(false)} aria-label="بستن منو">
                  <FaTimes />
                </button>
              </div>

              <p className="mb-2 flex items-center gap-2 font-semibold">
                <FaList /> دسته‌بندی‌ها
              </p>
              <div className="mb-4 ps-2">
                {NAV_CATEGORIES.map((cat, idx) => (
                  <div key={cat.name} className="py-1">
                    <button
                      type="button"
                      onClick={() =>
                        setMobileActiveCategory(mobileActiveCategory === idx ? null : idx)
                      }
                      className="flex w-full items-center justify-between py-1 text-start text-sm"
                    >
                      <span>{cat.name}</span>
                      {cat.sub && (
                        <FaChevronDown
                          className={`text-xs transition-transform ${
                            mobileActiveCategory === idx ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>
                    {mobileActiveCategory === idx && cat.sub && (
                      <ul className="ps-3">
                        {cat.sub.map((subItem) => (
                          <li key={subItem}>
                            <Link
                              href={`/products/list?category=${encodeURIComponent(subItem)}`}
                              onClick={closeAllMenus}
                              className="block py-1 text-sm text-gray-500 hover:text-brand-600"
                            >
                              {subItem}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeAllMenus}
                    className="flex items-center gap-2 text-sm"
                  >
                    <Icon /> {label}
                  </Link>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
