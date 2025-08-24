import { protectedProcedure, createTRPCRouter } from "@src/server/api/trpc";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { entityTags } from "@src/server/db/schema";

export const entityTagsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.entityTags.findMany({
      where: eq(entityTags.userId, ctx.user.ssd),
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.entityTags.findFirst({
        where: and(
          eq(entityTags.id, input.id),
          eq(entityTags.userId, ctx.user.ssd),
        ),
      });
    }),
});
