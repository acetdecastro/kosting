import { protectedProcedure, createTRPCRouter } from "@src/server/api/trpc";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { tags } from "@src/server/db/schema";

export const tagsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.tags.findMany({
      where: eq(tags.userId, ctx.user.sub),
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.tags.findFirst({
        where: and(eq(tags.id, input.id), eq(tags.userId, ctx.user.sub)),
      });
    }),
});
