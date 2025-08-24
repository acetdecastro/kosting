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

export const rawMaterials = pgTable(
  "raw_materials",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    userId: uuid("user_id").notNull(),
    name: varchar({ length: 100 }).notNull(),
    defaultUnitId: uuid("default_unit_id").notNull(),
    category: varchar({ length: 50 }),
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
    index("idx_raw_materials_not_deleted")
      .using("btree", t.userId.asc().nullsLast().op("uuid_ops"))
      .where(sql`(deleted_at IS NULL)`),
    index("idx_raw_materials_user_id").using(
      "btree",
      t.userId.asc().nullsLast().op("uuid_ops"),
    ),
    uniqueIndex("idx_raw_materials_user_name_unique").using(
      "btree",
      sql`user_id`,
      sql`null`,
    ),
    foreignKey({
      columns: [t.defaultUnitId],
      foreignColumns: [units.id],
      name: "raw_materials_default_unit_id_fkey",
    }),
  ],
);
