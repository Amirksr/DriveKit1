import mongoose from "mongoose";

/**
 * MongoDB connection helper.
 *
 * Next.js reloads route modules frequently in development (and can invoke
 * serverless functions concurrently in production), so a naive
 * `mongoose.connect()` call in every request would quickly exhaust the
 * connection pool. Instead we cache the connection (and the in-flight
 * connection promise) on the Node.js global object, which survives hot
 * reloads within the same process.
 *
 * Usage: `await dbConnect()` at the top of any server-side data function
 * before touching a Mongoose model.
 */

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Augment the Node global type so TypeScript knows about our cache slot.
declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = global._mongooseCache ?? { conn: null, promise: null };
global._mongooseCache = cache;

export async function dbConnect(): Promise<typeof mongoose> {
  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not set. Copy .env.example to .env.local and provide a connection string."
    );
  }

  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB ?? "drivekit",
      bufferCommands: false,
    });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}

export default dbConnect;
