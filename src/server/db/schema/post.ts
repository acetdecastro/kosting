import { sql } from "drizzle-orm";
import { index, pgTable } from "drizzle-orm/pg-core";

export const posts = pgTable(
  "post",
  (d) => ({
    id: d
      .uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    name: d.varchar("name", { length: 256 }),
    createdAt: d
      .timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d
      .timestamp("updated_at", { withTimezone: true })
      .$onUpdate(() => new Date()),
  }),
  (t) => [index("name_idx").on(t.name)],
);
