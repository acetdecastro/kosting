import { protectedProcedure, createTRPCRouter } from "@src/server/api/trpc";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { rawMaterials } from "@src/server/db/schema";

export const rawMaterialsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.rawMaterials.findMany({
      where: eq(rawMaterials.userId, ctx.user.sub),
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.rawMaterials.findFirst({
        where: and(
          eq(rawMaterials.id, input.id),
          eq(rawMaterials.userId, ctx.user.sub),
        ),
      });
    }),
});
