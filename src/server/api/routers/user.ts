import { createTRPCRouter, protectedProcedure } from "@src/server/api/trpc";

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(({ ctx }) => {
    return ctx.user ?? null;
  }),
});
