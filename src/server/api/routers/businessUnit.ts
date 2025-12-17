import z from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

/**
 * @todo: Important: Update procedure middlewares to admin procedures
 */
export const businessUnitRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.businessUnit.findMany();
  }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.businessUnit.create({
        data: {
          name: input.name,
        },
      });
    }),
});
