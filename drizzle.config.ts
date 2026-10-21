// import type { Config } from "drizzle-kit";

// export default {
//   schema: "./src/db/schema.ts",
//   out: "./drizzle",
//   dialect: "sqlite",
//   driver: "expo",
// } satisfies Config;

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'expo',
});