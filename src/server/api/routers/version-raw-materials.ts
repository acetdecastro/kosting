import { protectedProcedure, createTRPCRouter } from "@src/server/api/trpc";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { versionRawMaterials } from "@src/server/db/schema";

export const versionRawMaterialsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.versionRawMaterials.findMany({
      where: eq(versionRawMaterials.userId, ctx.user.sub),
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.versionRawMaterials.findFirst({
        where: and(
          eq(versionRawMaterials.id, input.id),
          eq(versionRawMaterials.userId, ctx.user.sub),
        ),
      });
    }),
});
