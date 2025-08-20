import { type Config } from "drizzle-kit";

import { env } from "@src/env";

export default {
  schema: "./src/server/db/schema",
  out: "./src/server/db/migration",
  verbose: true,
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  schemaFilter: ["public"],
} satisfies Config;
