import { Schema, model, models, type Model } from "mongoose";
import type { RawProduct } from "@/types/product";

/**
 * Mongoose document shape for a catalogue product.
 *
 * This mirrors `RawProduct` from `@/types/product` field-for-field so the
 * rest of the app (which was written against the original JSON catalogue
 * shape) keeps working unchanged — only the data *source* moved from
 * static files to MongoDB, not the shape of the data itself.
 */
export interface ProductDocument extends RawProduct {
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<ProductDocument>(
  {
    // `id` is the catalogue's own stable identifier (e.g. "brake-pad-3"),
    // kept separate from Mongo's internal `_id` so existing product links
    // and cart entries continue to resolve correctly.
    id: { type: String, required: true, unique: true, index: true },
    src: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: String, required: true },
    car: { type: String },
    brand: { type: String },
    discount: { type: Number, default: 0 },
    instock: { type: Boolean, required: true, default: true },
    category: { type: String, required: true, index: true },
  },
  { timestamps: true }
);

// Supports the "all products" search box (title/brand) efficiently.
ProductSchema.index({ title: "text", brand: "text" });

/**
 * `models.Product ?? model(...)` avoids Mongoose's
 * "OverwriteModelError: Cannot overwrite model once compiled" error, which
 * happens in Next.js dev mode because route modules can be re-evaluated
 * without the process restarting.
 */
export const Product: Model<ProductDocument> =
  models.Product ?? model<ProductDocument>("Product", ProductSchema);

export default Product;
