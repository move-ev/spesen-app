import {
  createAccountingUnitSchema,
  deleteAccountingUnitSchema,
  updateAccountingUnitSchema,
} from "@/lib/validators";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";

/**
 * @todo: Important: Update procedure middlewares to admin procedures
 */
export const accountingUnitRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.accountingUnit.findMany();
  }),
  create: publicProcedure
    .input(createAccountingUnitSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.accountingUnit.create({
        data: {
          name: input.name,
        },
      });
    }),
  update: publicProcedure
    .input(updateAccountingUnitSchema)
    .mutation(async ({ ctx, input }) => {
      const accountingUnit = await ctx.db.accountingUnit.findUnique({
        where: { id: input.id },
      });
      if (!accountingUnit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Kostenstelle nicht gefunden",
        });
      }

      return ctx.db.accountingUnit.update({
        where: { id: input.id },
        data: { name: input.name, updatedAt: new Date() },
      });
    }),
  delete: publicProcedure
    .input(deleteAccountingUnitSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.accountingUnit.delete({
        where: { id: input.id },
      });
    }),
});
