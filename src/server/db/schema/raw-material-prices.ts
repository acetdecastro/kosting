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
import { rawMaterials } from "./raw-materials";
import { suppliers } from "./suppliers";
import { units } from "./units";

export const rawMaterialPrices = pgTable(
  "raw_material_prices",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    userId: uuid("user_id").notNull(),
    rawMaterialId: uuid("raw_material_id").notNull(),
    supplierId: uuid("supplier_id"),
    packageQuantity: numeric("package_quantity", {
      precision: 12,
      scale: 4,
    }).notNull(),
    packageUnitId: uuid("package_unit_id").notNull(),
    packagePrice: numeric("package_price", {
      precision: 12,
      scale: 4,
    }).notNull(),
    effectiveFrom: date("effective_from")
      .default(sql`CURRENT_DATE`)
      .notNull(),
    effectiveTo: date("effective_to"),
    notes: text(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    index("idx_raw_material_prices_effective_from").using(
      "btree",
      t.effectiveFrom.asc().nullsLast().op("date_ops"),
    ),
    index("idx_raw_material_prices_material_id").using(
      "btree",
      t.rawMaterialId.asc().nullsLast().op("uuid_ops"),
    ),
    index("idx_raw_material_prices_supplier_id").using(
      "btree",
      t.supplierId.asc().nullsLast().op("uuid_ops"),
    ),
    index("idx_raw_material_prices_user_id").using(
      "btree",
      t.userId.asc().nullsLast().op("uuid_ops"),
    ),
    foreignKey({
      columns: [t.packageUnitId],
      foreignColumns: [units.id],
      name: "raw_material_prices_package_unit_id_fkey",
    }),
    foreignKey({
      columns: [t.rawMaterialId],
      foreignColumns: [rawMaterials.id],
      name: "raw_material_prices_raw_material_id_fkey",
    }),
    foreignKey({
      columns: [t.supplierId],
      foreignColumns: [suppliers.id],
      name: "raw_material_prices_supplier_id_fkey",
    }),
  ],
);
