import { protectedProcedure, createTRPCRouter } from "@src/server/api/trpc";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { rawMaterialPrices } from "@src/server/db/schema";

export const rawMaterialPricesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.rawMaterialPrices.findMany({
      where: eq(rawMaterialPrices.userId, ctx.user.sub),
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.rawMaterialPrices.findFirst({
        where: and(
          eq(rawMaterialPrices.id, input.id),
          eq(rawMaterialPrices.userId, ctx.user.sub),
        ),
      });
    }),
});
