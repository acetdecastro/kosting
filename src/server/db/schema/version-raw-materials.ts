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
import { rawMaterials } from "./raw-materials";
import { units } from "./units";

export const versionRawMaterials = pgTable(
  "version_raw_materials",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    userId: uuid("user_id").notNull(),
    versionId: uuid("version_id").notNull(),
    rawMaterialId: uuid("raw_material_id").notNull(),
    quantity: numeric({ precision: 12, scale: 4 }).notNull(),
    unitId: uuid("unit_id").notNull(),
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
    index("idx_version_raw_materials_material_id").using(
      "btree",
      t.rawMaterialId.asc().nullsLast().op("uuid_ops"),
    ),
    index("idx_version_raw_materials_not_deleted")
      .using("btree", t.userId.asc().nullsLast().op("uuid_ops"))
      .where(sql`(deleted_at IS NULL)`),
    index("idx_version_raw_materials_user_id").using(
      "btree",
      t.userId.asc().nullsLast().op("uuid_ops"),
    ),
    index("idx_version_raw_materials_version_id").using(
      "btree",
      t.versionId.asc().nullsLast().op("uuid_ops"),
    ),
    foreignKey({
      columns: [t.rawMaterialId],
      foreignColumns: [rawMaterials.id],
      name: "version_raw_materials_raw_material_id_fkey",
    }),
    foreignKey({
      columns: [t.unitId],
      foreignColumns: [units.id],
      name: "version_raw_materials_unit_id_fkey",
    }),
    foreignKey({
      columns: [t.versionId],
      foreignColumns: [productVersions.id],
      name: "version_raw_materials_version_id_fkey",
    }),
  ],
);
