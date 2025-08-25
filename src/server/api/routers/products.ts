import { protectedProcedure, createTRPCRouter } from "@src/server/api/trpc";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { products } from "@src/server/db/schema";

export const productsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.products.findMany({
      where: eq(products.userId, ctx.user.sub),
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.products.findFirst({
        where: and(
          eq(products.id, input.id),
          eq(products.userId, ctx.user.sub),
        ),
      });
    }),
});
