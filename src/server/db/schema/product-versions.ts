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
import { products } from "./products";
import { units } from "./units";

export const productVersions = pgTable(
  "product_versions",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    userId: uuid("user_id").notNull(),
    productId: uuid("product_id").notNull(),
    versionNo: smallint("version_no").notNull(),
    basedOnVersionId: uuid("based_on_version_id"),
    yieldQuantity: numeric("yield_quantity", {
      precision: 12,
      scale: 4,
    }).notNull(),
    yieldUnitId: uuid("yield_unit_id").notNull(),
    targetMarginPct: numeric("target_margin_pct", { precision: 5, scale: 2 })
      .default("0")
      .notNull(),
    vatEnabled: boolean("vat_enabled").default(false).notNull(),
    discountEnabled: boolean("discount_enabled").default(false).notNull(),
    discountPct: numeric("discount_pct", { precision: 5, scale: 2 })
      .default("0")
      .notNull(),
    vatRatePct: numeric("vat_rate_pct", { precision: 5, scale: 2 })
      .default("12.00")
      .notNull(),
    cogsPerUnit: numeric("cogs_per_unit", { precision: 12, scale: 4 })
      .default("0")
      .notNull(),
    priceBeforeVat: numeric("price_before_vat", { precision: 12, scale: 4 })
      .default("0")
      .notNull(),
    priceAfterVat: numeric("price_after_vat", { precision: 12, scale: 4 })
      .default("0")
      .notNull(),
    grossProfitPerUnit: numeric("gross_profit_per_unit", {
      precision: 12,
      scale: 4,
    })
      .default("0")
      .notNull(),
    netProfitPerUnit: numeric("net_profit_per_unit", {
      precision: 12,
      scale: 4,
    })
      .default("0")
      .notNull(),
    lastComputedAt: timestamp("last_computed_at", {
      withTimezone: true,
      mode: "string",
    }),
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
    index("idx_product_versions_not_deleted")
      .using("btree", t.userId.asc().nullsLast().op("uuid_ops"))
      .where(sql`(deleted_at IS NULL)`),
    index("idx_product_versions_product_id").using(
      "btree",
      t.productId.asc().nullsLast().op("uuid_ops"),
    ),
    index("idx_product_versions_user_id").using(
      "btree",
      t.userId.asc().nullsLast().op("uuid_ops"),
    ),
    foreignKey({
      columns: [t.basedOnVersionId],
      foreignColumns: [t.id],
      name: "product_versions_based_on_version_id_fkey",
    }),
    foreignKey({
      columns: [t.productId],
      foreignColumns: [products.id],
      name: "product_versions_product_id_fkey",
    }).onDelete("cascade"),
    foreignKey({
      columns: [t.yieldUnitId],
      foreignColumns: [units.id],
      name: "product_versions_yield_unit_id_fkey",
    }),
    unique("product_versions_product_id_version_no_key").on(
      t.productId,
      t.versionNo,
    ),
  ],
);
