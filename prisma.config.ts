import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "prisma/config";

for (const fileName of [".env.local", ".env"]) {
  const filePath = resolve(process.cwd(), fileName);

  if (existsSync(filePath)) {
    process.loadEnvFile(filePath);
  }
}

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is missing. Put it in .env or .env.local at the project root.",
  );
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    path: "prisma/migrations",
  },
});
