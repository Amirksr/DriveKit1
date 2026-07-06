import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import Product from "@/models/Product";
import { getProductById, getProducts } from "@/lib/products";

// `dbConnect()` reads `process.env.MONGODB_URI` and caches the connection
// on the Node global; for this test we connect directly with mongoose to
// the in-memory server and populate the same global cache slot so
// `getProducts`/`getProductById` (which call `dbConnect()` internally)
// reuse this connection instead of trying to read a real env var.
declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

let mongod: MongoMemoryServer;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  const conn = await mongoose.connect(uri, { dbName: "drivekit-test" });
  global._mongooseCache = { conn, promise: Promise.resolve(conn) };

  await Product.insertMany([
    {
      id: "brake-pad-1",
      src: "1.jpg",
      title: "لنت ترمز جلو پژو ۲۰۶",
      price: "۲۰۰,۰۰۰",
      car: "پژو 206",
      brand: "ایساکو",
      discount: 10,
      instock: true,
      category: "brake-pad",
    },
    {
      id: "brake-pad-2",
      src: "2.jpg",
      title: "لنت ترمز عقب سمند",
      price: "۱۵۰,۰۰۰",
      car: "سمند",
      brand: "والئو",
      discount: 0,
      instock: false,
      category: "brake-pad",
    },
    {
      id: "radiator-1",
      src: "1.jpg",
      title: "رادیاتور آب پراید",
      price: "۹۰۰,۰۰۰",
      car: "پراید",
      brand: "کوشش رادیاتور",
      discount: 15,
      instock: true,
      category: "radiator",
    },
  ]);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe("getProducts (MongoDB integration)", () => {
  it("returns every product when no filters are given", async () => {
    const products = await getProducts();
    expect(products).toHaveLength(3);
  });

  it("filters by category slug", async () => {
    const products = await getProducts({ category: "brake-pad" });
    expect(products).toHaveLength(2);
    expect(products.every((p) => p.category === "brake-pad")).toBe(true);
  });

  it("filters by Persian category label via the label->slug map", async () => {
    const products = await getProducts({ category: "لنت ترمز" });
    expect(products).toHaveLength(2);
  });

  it("filters to discounted products only", async () => {
    const products = await getProducts({ discountOnly: true });
    expect(products.map((p) => p.id).sort()).toEqual(["brake-pad-1", "radiator-1"]);
  });

  it("filters to in-stock products only", async () => {
    const products = await getProducts({ inStockOnly: true });
    expect(products.every((p) => p.instock)).toBe(true);
    expect(products).toHaveLength(2);
  });

  it("performs a case-insensitive text search across title and brand", async () => {
    const byTitle = await getProducts({ search: "سمند" });
    expect(byTitle.map((p) => p.id)).toEqual(["brake-pad-2"]);

    const byBrand = await getProducts({ search: "ایساکو" });
    expect(byBrand.map((p) => p.id)).toEqual(["brake-pad-1"]);
  });

  it("applies min/max price filtering on the parsed (non-Persian) price", async () => {
    // radiator-1 is ۹۰۰,۰۰۰ -> 900000, well above a 500000 max.
    const products = await getProducts({ maxPrice: 500000 });
    expect(products.map((p) => p.id).sort()).toEqual(["brake-pad-1", "brake-pad-2"]);
  });

  it("builds a correct public image URL from category + src", async () => {
    const [product] = await getProducts({ category: "radiator" });
    expect(product?.imageUrl).toBe("/assets/products-list/radiator/1.jpg");
  });
});

describe("getProductById (MongoDB integration)", () => {
  it("returns the matching product", async () => {
    const product = await getProductById("radiator-1");
    expect(product?.title).toBe("رادیاتور آب پراید");
  });

  it("returns null for an unknown id", async () => {
    const product = await getProductById("does-not-exist");
    expect(product).toBeNull();
  });
});
