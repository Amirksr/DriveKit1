import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/products";

/**
 * GET /api/products
 *
 * Query params (all optional):
 *   category    - Persian label or slug, e.g. "لنت ترمز" or "brake-pad"
 *   categories  - comma-separated list of labels/slugs (union of all their products);
 *                 takes precedence over `category`. Pass an empty string to force zero results
 *                 (used when a category-name search matched nothing).
 *   search      - free-text match against title/brand
 *   minPrice    - number, Toman
 *   maxPrice    - number, Toman
 *   discount    - "1" to only return discounted products
 *   excludeDiscount - "1" to only return products that are NOT discounted
 *   inStock     - "1" to only return in-stock products
 *   limit       - max number of results
 *   random      - "1" to shuffle results server-side (MongoDB $sample)
 *
 * Used by client components (AllProducts, ProductList, home carousels)
 * that need to re-query as the user changes filters, without re-fetching
 * the whole catalogue on every keystroke.
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  try {
    const products = await getProducts({
      category: params.get("category") ?? undefined,
      categories: params.has("categories")
        ? (params.get("categories") ?? "").split(",").filter(Boolean)
        : undefined,
      search: params.get("search") ?? undefined,
      minPrice: params.has("minPrice") ? Number(params.get("minPrice")) : undefined,
      maxPrice: params.has("maxPrice") ? Number(params.get("maxPrice")) : undefined,
      discountOnly: params.get("discount") === "1",
      excludeDiscounted: params.get("excludeDiscount") === "1",
      inStockOnly: params.get("inStock") === "1",
      limit: params.has("limit") ? Number(params.get("limit")) : undefined,
      random: params.get("random") === "1",
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("GET /api/products failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch products. Is MONGODB_URI configured?" },
      { status: 500 }
    );
  }
}
