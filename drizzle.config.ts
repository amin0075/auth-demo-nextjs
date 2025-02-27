import { env } from "@/data/env/server";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  strict: true,
  verbose: true,
  dbCredentials: {
    password: env.DB_PASSWORD,
    user: env.DB_USER,
    database: env.DB_NAME,
    host: env.DB_HOST,
    ssl: false,
  },
});
