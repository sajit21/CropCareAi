import Redis from "ioredis"
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis(process.env.UPTASH_REDIS_URI);


redis.on("error", (err) => {
  console.error("Redis error:", err);
});