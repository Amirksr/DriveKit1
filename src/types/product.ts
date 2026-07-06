/**
 * Raw product shape exactly as it comes back from the static catalogue
 * files in `public/assets/products-list/<category>/data.json`.
 *
 * Prices are stored as Persian-formatted strings (e.g. "۱۷۴,۰۰۰") in the
 * source data, so `price` is intentionally typed as `string` here — use
 * `parsePrice()` from `@/lib/price` to convert it to a number.
 */
export interface RawProduct {
  id: string;
  src: string;
  title: string;
  price: string;
  car?: string;
  brand?: string;
  /** Discount percentage, e.g. `15` means 15% off. `0` or `undefined` means no discount. */
  discount?: number;
  instock: boolean;
  category: string;
}

/**
 * Normalized product used throughout the UI once raw catalogue entries
 * have been merged, tagged with their category slug, and given a
 * guaranteed unique `id`.
 */
export interface Product extends RawProduct {
  /** Public URL of the product image, e.g. `/assets/products-list/brake-pad/foo.jpg`. */
  imageUrl: string;
}

/** A single line item stored in the shopping cart slice. */
export interface CartItem {
  id: string;
  name: string;
  /** Unit price in Toman, as a plain number (already discount-adjusted). */
  price: number;
  image: string;
  inStock: boolean;
  quantity: number;
}
