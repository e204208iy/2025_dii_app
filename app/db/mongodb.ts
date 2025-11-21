import mongoose, { ConnectOptions } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("⚠️ MONGODB_URI が .env に設定されていません");
}

// --- 型定義（TS が undefined を許容するようにする） ---
declare global {
  // Node.js の global に _mongoose を追加
  var _mongoose:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

// --- キャッシュの初期化 ---
const cached = global._mongoose || (global._mongoose = { conn: null, promise: null });

// --- 接続関数 ---
export async function connectToDatabase() {
  // 既に接続されている
  if (cached.conn) {
    return cached.conn;
  }

  // 接続処理がまだなら作る
  if (!cached.promise) {
    mongoose.set("strictQuery", false);

    const opts: ConnectOptions = {
      dbName: "dii_app",
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => mongoose);
  }

  // 接続の完了を待つ
  cached.conn = await cached.promise;
  return cached.conn;
}
