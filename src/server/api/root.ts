import { createCallerFactory, createTRPCRouter } from "@src/server/api/trpc";
import {
  usersRouter,
  tagsRouter,
  productsRouter,
  packagingItemsRouter,
  packagingPricesRouter,
  productVersionsRouter,
  rawMaterialPricesRouter,
  rawMaterialsRouter,
  suppliersRouter,
  unitsRouter,
  entityTagsRouter,
  versionPackagingRouter,
  versionRawMaterialsRouter,
} from "./routers";

export const appRouter = createTRPCRouter({
  users: usersRouter,
  tags: tagsRouter,
  products: productsRouter,
  packagingItems: packagingItemsRouter,
  packagingPrices: packagingPricesRouter,
  productVersions: productVersionsRouter,
  rawMaterialPrices: rawMaterialPricesRouter,
  rawMaterials: rawMaterialsRouter,
  suppliers: suppliersRouter,
  units: unitsRouter,
  entityTags: entityTagsRouter,
  versionPackaging: versionPackagingRouter,
  versionRawMaterials: versionRawMaterialsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
