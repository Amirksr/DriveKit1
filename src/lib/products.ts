import type { PipelineStage } from "mongoose";
import { dbConnect } from "@/lib/mongodb";
import Product from "@/models/Product";
import type { Product as ProductDTO } from "@/types/product";
import { parsePrice } from "@/lib/price";
import { CATEGORY_LABEL_TO_SLUG } from "@/data/categories";

/** Query options accepted by `getProducts`, shared by server pages and the `/api/products` route. */
export interface ProductQuery {
  /** Persian category label (e.g. "لنت ترمز") or a category slug. Omit/leave undefined for all categories. */
  category?: string;
  /** Free-text search across title and brand. */
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  discountOnly?: boolean;
  inStockOnly?: boolean;
  /** Maximum number of documents to return. Omit for no limit. */
  limit?: number;
  /** Return the results in random order (used by the homepage carousels). */
  random?: boolean;
}

/** Converts a raw Mongoose document into the plain, JSON-serializable DTO the UI expects. */
function toDTO(doc: {
  id: string;
  src: string;
  title: string;
  price: string;
  car?: string;
  brand?: string;
  discount?: number;
  instock: boolean;
  category: string;
}): ProductDTO {
  return {
    id: doc.id,
    src: doc.src,
    title: doc.title,
    price: doc.price,
    car: doc.car,
    brand: doc.brand,
    discount: doc.discount ?? 0,
    instock: doc.instock,
    category: doc.category,
    imageUrl: `/assets/products-list/${doc.category}/${doc.src}`,
  };
}

/**
 * Fetches products from MongoDB according to the given filters. This is
 * the single data-access function used by both server components (e.g.
 * the homepage) and the `/api/products` route handler that client
 * components call for interactive filtering.
 */
export async function getProducts(query: ProductQuery = {}): Promise<ProductDTO[]> {
  await dbConnect();

  const filter: Record<string, unknown> = {};

  if (query.category && query.category !== "همه") {
    // Accept either a Persian label or a raw slug so callers don't need
    // to know which form they have on hand.
    const slug = CATEGORY_LABEL_TO_SLUG[query.category] ?? query.category;
    filter.category = slug;
  }

  if (query.discountOnly) {
    filter.discount = { $gt: 0 };
  }

  if (query.inStockOnly) {
    filter.instock = true;
  }

  if (query.search?.trim()) {
    const pattern = query.search.trim();
    filter.$or = [
      { title: { $regex: pattern, $options: "i" } },
      { brand: { $regex: pattern, $options: "i" } },
    ];
  }

  let cursor = Product.find(filter).lean();

  if (query.random) {
    // $sample requires the aggregation pipeline rather than find(), so
    // fall back to an aggregation when random ordering is requested.
    const pipeline: PipelineStage[] = [{ $match: filter }];
    if (query.limit) pipeline.push({ $sample: { size: query.limit } });
    const docs = await Product.aggregate(pipeline);
    return docs.map(toDTO).filter((p) => matchesPriceRange(p, query));
  }

  if (query.limit) {
    cursor = cursor.limit(query.limit);
  }

  const docs = await cursor.exec();
  return docs.map(toDTO).filter((p) => matchesPriceRange(p, query));
}

/**
 * Min/max price filters are applied in JS rather than in the Mongo query
 * because catalogue prices are stored as Persian-formatted strings
 * (e.g. `"۱۷۴,۰۰۰"`); we parse them via `parsePrice` (see `@/lib/price`)
 * before comparing.
 */
function matchesPriceRange(
  product: ProductDTO,
  query: Pick<ProductQuery, "minPrice" | "maxPrice">
): boolean {
  if (!query.minPrice && !query.maxPrice) return true;
  const numericPrice = parsePrice(product.price);
  if (query.minPrice && numericPrice < query.minPrice) return false;
  if (query.maxPrice && numericPrice > query.maxPrice) return false;
  return true;
}

/** Fetches a single product by its catalogue `id`. Returns `null` if not found. */
export async function getProductById(id: string): Promise<ProductDTO | null> {
  await dbConnect();
  const doc = await Product.findOne({ id }).lean();
  return doc ? toDTO(doc) : null;
}
