import { protectedProcedure, createTRPCRouter } from "@src/server/api/trpc";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { users } from "@src/server/db/schema";

export const usersRouter = createTRPCRouter({
  me: protectedProcedure.query(({ ctx }) => {
    return ctx.user;
  }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findMany({
      where: eq(users.id, ctx.user.sub),
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.users.findFirst({
        where: and(eq(users.id, ctx.user.sub), eq(users.id, input.id)),
      });
    }),
});
