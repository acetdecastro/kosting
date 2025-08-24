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
import { units } from "./units";

export const products = pgTable(
  "products",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    userId: uuid("user_id").notNull(),
    name: varchar({ length: 100 }).notNull(),
    category: varchar({ length: 30 }).notNull(),
    yieldQuantity: numeric("yield_quantity", { precision: 12, scale: 4 })
      .default("1")
      .notNull(),
    yieldUnitId: uuid("yield_unit_id").notNull(),
    notes: text(),
    metadata: jsonb(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true, mode: "string" }),
  },
  (t) => [
    index("idx_products_not_deleted")
      .using("btree", t.userId.asc().nullsLast().op("uuid_ops"))
      .where(sql`(deleted_at IS NULL)`),
    index("idx_products_user_id").using(
      "btree",
      t.userId.asc().nullsLast().op("uuid_ops"),
    ),
    uniqueIndex("idx_products_user_name_unique").using(
      "btree",
      sql`user_id`,
      sql`null`,
    ),
    foreignKey({
      columns: [t.yieldUnitId],
      foreignColumns: [units.id],
      name: "products_yield_unit_id_fkey",
    }),
    check(
      "products_category_check",
      sql`(category)::text = ANY ((ARRAY['food'::character varying, 'non_food'::character varying, 'service'::character varying])::text[])`,
    ),
  ],
);
