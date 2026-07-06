/**
 * Price parsing & formatting helpers.
 *
 * The original codebase re-implemented this exact logic (Persian digit
 * conversion, comma stripping, discount math) independently in four places
 * — `AllProducts.jsx`, `ProductList.jsx`, `NewProducts.jsx` and
 * `SpecialOffers.jsx` — which meant any bug fix had to be applied four
 * times. It now lives in one tested module.
 */

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ENGLISH_DIGITS = "0123456789";

/** Converts any Persian/Farsi digits found in a string to their ASCII equivalents. */
export function toEnglishDigits(value: string): string {
  return value
    .split("")
    .map((char) => {
      const index = PERSIAN_DIGITS.indexOf(char);
      return index === -1 ? char : ENGLISH_DIGITS[index];
    })
    .join("");
}

/** Converts ASCII digits in a string to their Persian/Farsi equivalents. */
export function toPersianDigits(value: string): string {
  return value.replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)] ?? digit);
}

/**
 * Parses a catalogue price string (e.g. `"۱۷۴,۰۰۰"`, `"174,000"`, or a
 * plain number-like value) into a numeric Toman amount.
 *
 * Returns `0` for empty, `null`/`undefined`, or unparsable input rather
 * than throwing, since product data is sourced from static JSON files
 * that aren't guaranteed to be perfectly clean.
 */
export function parsePrice(value: string | number | null | undefined): number {
  if (value === null || value === undefined || value === "") return 0;
  const normalized = toEnglishDigits(String(value)).replace(/[,٬\s]/g, "");
  const parsed = Number(normalized);
  return Number.isNaN(parsed) ? 0 : parsed;
}

/**
 * Applies a percentage discount (0-100) to a numeric price and rounds to
 * the nearest whole Toman. A `discountPercent` of `0` or `undefined`
 * returns the original price unchanged.
 */
export function applyDiscount(
  price: number,
  discountPercent: number | undefined | null
): number {
  if (!discountPercent || discountPercent <= 0) return price;
  return Math.round(price * (1 - discountPercent / 100));
}

/**
 * Formats a numeric Toman amount for display using Persian digit grouping,
 * e.g. `174000` -> `"۱۷۴,۰۰۰ تومان"`.
 */
export function formatToman(amount: number): string {
  return `${amount.toLocaleString("fa-IR")} تومان`;
}
