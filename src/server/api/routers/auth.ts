import { createTRPCRouter, protectedProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  isAdmin: protectedProcedure.query(async ({ ctx }) => {
    return ctx.session?.user?.role === "admin";
  }),
  getCurrentSession: protectedProcedure.query(async ({ ctx }) => {
    return ctx.session;
  }),
});
