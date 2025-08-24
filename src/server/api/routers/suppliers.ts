import { protectedProcedure, createTRPCRouter } from "@src/server/api/trpc";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { suppliers } from "@src/server/db/schema";


export const suppliersRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.suppliers.findMany({
      where: eq(suppliers.userId, ctx.user.ssd),
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.suppliers.findFirst({
        where: and(
          eq(suppliers.id, input.id),
          eq(suppliers.userId, ctx.user.ssd),
        ),
      });
    }),
});

