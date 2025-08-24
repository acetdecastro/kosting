import { relations } from "drizzle-orm/relations";
import {
  units,
  products,
  productVersions,
  rawMaterials,
  rawMaterialPrices,
  suppliers,
  versionRawMaterials,
  packagingItems,
  packagingPrices,
  versionPackaging,
  tags,
  entityTags,
  users,
} from "@src/server/db/schema";
import { usersInAuth } from "@src/server/db/schema/auth-users";

export const productsRelations = relations(products, ({ one, many }) => ({
  unit: one(units, {
    fields: [products.yieldUnitId],
    references: [units.id],
  }),
  productVersions: many(productVersions),
}));

export const unitsRelations = relations(units, ({ many }) => ({
  products: many(products),
  productVersions: many(productVersions),
  rawMaterials: many(rawMaterials),
  rawMaterialPrices: many(rawMaterialPrices),
  versionRawMaterials: many(versionRawMaterials),
  packagingItems: many(packagingItems),
  packagingPrices: many(packagingPrices),
  versionPackagings: many(versionPackaging),
}));

export const productVersionsRelations = relations(
  productVersions,
  ({ one, many }) => ({
    productVersion: one(productVersions, {
      fields: [productVersions.basedOnVersionId],
      references: [productVersions.id],
      relationName: "productVersions_basedOnVersionId_productVersions_id",
    }),
    productVersions: many(productVersions, {
      relationName: "productVersions_basedOnVersionId_productVersions_id",
    }),
    product: one(products, {
      fields: [productVersions.productId],
      references: [products.id],
    }),
    unit: one(units, {
      fields: [productVersions.yieldUnitId],
      references: [units.id],
    }),
    versionRawMaterials: many(versionRawMaterials),
    versionPackagings: many(versionPackaging),
  }),
);

export const rawMaterialsRelations = relations(
  rawMaterials,
  ({ one, many }) => ({
    unit: one(units, {
      fields: [rawMaterials.defaultUnitId],
      references: [units.id],
    }),
    rawMaterialPrices: many(rawMaterialPrices),
    versionRawMaterials: many(versionRawMaterials),
  }),
);

export const rawMaterialPricesRelations = relations(
  rawMaterialPrices,
  ({ one }) => ({
    unit: one(units, {
      fields: [rawMaterialPrices.packageUnitId],
      references: [units.id],
    }),
    rawMaterial: one(rawMaterials, {
      fields: [rawMaterialPrices.rawMaterialId],
      references: [rawMaterials.id],
    }),
    supplier: one(suppliers, {
      fields: [rawMaterialPrices.supplierId],
      references: [suppliers.id],
    }),
  }),
);

export const suppliersRelations = relations(suppliers, ({ many }) => ({
  rawMaterialPrices: many(rawMaterialPrices),
  packagingPrices: many(packagingPrices),
}));

export const versionRawMaterialsRelations = relations(
  versionRawMaterials,
  ({ one }) => ({
    rawMaterial: one(rawMaterials, {
      fields: [versionRawMaterials.rawMaterialId],
      references: [rawMaterials.id],
    }),
    unit: one(units, {
      fields: [versionRawMaterials.unitId],
      references: [units.id],
    }),
    productVersion: one(productVersions, {
      fields: [versionRawMaterials.versionId],
      references: [productVersions.id],
    }),
  }),
);

export const packagingItemsRelations = relations(
  packagingItems,
  ({ one, many }) => ({
    unit: one(units, {
      fields: [packagingItems.defaultUnitId],
      references: [units.id],
    }),
    packagingPrices: many(packagingPrices),
    versionPackagings: many(versionPackaging),
  }),
);

export const packagingPricesRelations = relations(
  packagingPrices,
  ({ one }) => ({
    unit: one(units, {
      fields: [packagingPrices.packageUnitId],
      references: [units.id],
    }),
    packagingItem: one(packagingItems, {
      fields: [packagingPrices.packagingItemId],
      references: [packagingItems.id],
    }),
    supplier: one(suppliers, {
      fields: [packagingPrices.supplierId],
      references: [suppliers.id],
    }),
  }),
);

export const versionPackagingRelations = relations(
  versionPackaging,
  ({ one }) => ({
    packagingItem: one(packagingItems, {
      fields: [versionPackaging.packagingItemId],
      references: [packagingItems.id],
    }),
    unit: one(units, {
      fields: [versionPackaging.unitId],
      references: [units.id],
    }),
    productVersion: one(productVersions, {
      fields: [versionPackaging.versionId],
      references: [productVersions.id],
    }),
  }),
);

export const entityTagsRelations = relations(entityTags, ({ one }) => ({
  tag: one(tags, {
    fields: [entityTags.tagId],
    references: [tags.id],
  }),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  entityTags: many(entityTags),
}));

export const usersRelations = relations(users, ({ one }) => ({
  usersInAuth: one(usersInAuth, {
    fields: [users.id],
    references: [usersInAuth.id],
  }),
}));

export const usersInAuthRelations = relations(usersInAuth, ({ many }) => ({
  users: many(users),
}));
