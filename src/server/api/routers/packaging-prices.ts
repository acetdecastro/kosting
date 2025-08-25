import { protectedProcedure, createTRPCRouter } from "@src/server/api/trpc";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { packagingPrices } from "@src/server/db/schema";

export const packagingPricesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.packagingPrices.findMany({
      where: eq(packagingPrices.userId, ctx.user.sub),
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.packagingPrices.findFirst({
        where: and(
          eq(packagingPrices.id, input.id),
          eq(packagingPrices.userId, ctx.user.sub),
        ),
      });
    }),
});
