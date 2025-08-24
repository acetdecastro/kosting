import { protectedProcedure, createTRPCRouter } from "@src/server/api/trpc";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { packagingItems } from "@src/server/db/schema";

export const packagingItemsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.packagingItems.findMany({
      where: eq(packagingItems.userId, ctx.user.ssd),
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.packagingItems.findFirst({
        where: and(
          eq(packagingItems.id, input.id),
          eq(packagingItems.userId, ctx.user.ssd),
        ),
      });
    }),
});
