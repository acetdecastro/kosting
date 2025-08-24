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
import { productVersions } from "./product-versions";
import { packagingItems } from "./packaging-items";
import { units } from "./units";

export const versionPackaging = pgTable(
  "version_packaging",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    userId: uuid("user_id").notNull(),
    versionId: uuid("version_id").notNull(),
    packagingItemId: uuid("packaging_item_id").notNull(),
    quantity: numeric({ precision: 12, scale: 4 }).notNull(),
    unitId: uuid("unit_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true, mode: "string" }),
  },
  (t) => [
    index("idx_version_packaging_item_id").using(
      "btree",
      t.packagingItemId.asc().nullsLast().op("uuid_ops"),
    ),
    index("idx_version_packaging_not_deleted")
      .using("btree", t.userId.asc().nullsLast().op("uuid_ops"))
      .where(sql`(deleted_at IS NULL)`),
    index("idx_version_packaging_user_id").using(
      "btree",
      t.userId.asc().nullsLast().op("uuid_ops"),
    ),
    index("idx_version_packaging_version_id").using(
      "btree",
      t.versionId.asc().nullsLast().op("uuid_ops"),
    ),
    foreignKey({
      columns: [t.packagingItemId],
      foreignColumns: [packagingItems.id],
      name: "version_packaging_packaging_item_id_fkey",
    }),
    foreignKey({
      columns: [t.unitId],
      foreignColumns: [units.id],
      name: "version_packaging_unit_id_fkey",
    }),
    foreignKey({
      columns: [t.versionId],
      foreignColumns: [productVersions.id],
      name: "version_packaging_version_id_fkey",
    }),
  ],
);
