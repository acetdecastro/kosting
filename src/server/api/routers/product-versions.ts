import { protectedProcedure, createTRPCRouter } from "@src/server/api/trpc";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { productVersions } from "@src/server/db/schema";

export const productVersionsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.productVersions.findMany({
      where: eq(productVersions.userId, ctx.user.sub),
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.productVersions.findFirst({
        where: and(
          eq(productVersions.id, input.id),
          eq(productVersions.userId, ctx.user.sub),
        ),
      });
    }),
});
