import { protectedProcedure, createTRPCRouter } from "@src/server/api/trpc";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { versionPackaging } from "@src/server/db/schema";

export const versionPackagingRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.versionPackaging.findMany({
      where: eq(versionPackaging.userId, ctx.user.ssd),
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.versionPackaging.findFirst({
        where: and(
          eq(versionPackaging.id, input.id),
          eq(versionPackaging.userId, ctx.user.ssd),
        ),
      });
    }),
});
