import { protectedProcedure, createTRPCRouter } from "@src/server/api/trpc";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { units } from "@src/server/db/schema";


export const unitsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.units.findMany({
      where: eq(units.userId, ctx.user.ssd),
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.units.findFirst({
        where: and(
          eq(units.id, input.id),
          eq(units.userId, ctx.user.ssd),
        ),
      });
    }),
});

