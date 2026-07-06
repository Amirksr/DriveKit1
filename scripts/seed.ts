/**
 * One-off migration script: reads every `data.json` file under
 * `public/assets/products-list/<category>/` (the original static
 * catalogue) and upserts each product into the `products` collection in
 * MongoDB.
 *
 * Usage:
 *   1. Copy .env.example to .env.local and set MONGODB_URI
 *   2. npm run seed
 *
 * The script is idempotent: it upserts by the catalogue's own `id` field,
 * so re-running it after editing a JSON file simply updates the matching
 * documents instead of creating duplicates.
 */
import "dotenv/config";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import mongoose from "mongoose";
import Product from "../src/models/Product";
import type { RawProduct } from "../src/types/product";

const CATALOGUE_DIR = path.join(process.cwd(), "public", "assets", "products-list");

async function loadCategoryFolders(): Promise<string[]> {
  const entries = await readdir(CATALOGUE_DIR, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
}

async function loadProductsForCategory(folder: string): Promise<RawProduct[]> {
  const dataPath = path.join(CATALOGUE_DIR, folder, "data.json");
  try {
    const raw = await readFile(dataPath, "utf-8");
    const parsed: Record<string, RawProduct[]> = JSON.parse(raw);
    // Each data.json is keyed by category slug, e.g. { "brake-pad": [...] }
    return Object.values(parsed)
      .flat()
      .map((item, index) => ({
        ...item,
        id: item.id ?? `${folder}-${index}`,
        category: item.category ?? folder,
      }));
  } catch (error) {
    console.warn(`⚠️  Skipping "${folder}" — could not read/parse data.json:`, error);
    return [];
  }
}

async function seed() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not set. Copy .env.example to .env.local first.");
  }

  console.log("Connecting to MongoDB…");
  await mongoose.connect(mongoUri, { dbName: process.env.MONGODB_DB ?? "drivekit" });

  const folders = await loadCategoryFolders();
  console.log(`Found ${folders.length} category folders.`);

  let total = 0;
  for (const folder of folders) {
    const products = await loadProductsForCategory(folder);
    if (products.length === 0) continue;

    const operations = products.map((product) => ({
      updateOne: {
        filter: { id: product.id },
        update: { $set: product },
        upsert: true,
      },
    }));

    const result = await Product.bulkWrite(operations);
    total += products.length;
    console.log(
      `  • ${folder}: ${products.length} products (upserted ${result.upsertedCount}, modified ${result.modifiedCount})`
    );
  }

  console.log(`\n✅ Done. Seeded/updated ${total} products across ${folders.length} categories.`);
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error("❌ Seed failed:", error);
  process.exitCode = 1;
});
