import {
  pgTable,
  index,
  uuid,
  varchar,
  timestamp,
  uniqueIndex,
  foreignKey,
  check,
  numeric,
  text,
  jsonb,
  unique,
  smallint,
  boolean,
  date,
  pgSchema,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const tags = pgTable(
  "tags",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    userId: uuid("user_id").notNull(),
    label: varchar({ length: 50 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    index("idx_tags_user_id").using(
      "btree",
      t.userId.asc().nullsLast().op("uuid_ops"),
    ),
    uniqueIndex("idx_tags_user_label_unique").using(
      "btree",
      sql`user_id`,
      sql`null`,
    ),
    index("tags_label_trgm_idx").using(
      "gin",
      t.label.asc().nullsLast().op("gin_trgm_ops"),
    ),
  ],
);
