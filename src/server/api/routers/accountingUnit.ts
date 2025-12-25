import { TRPCError } from '@trpc/server'
import {
  createAccountingUnitSchema,
  deleteAccountingUnitSchema,
  updateAccountingUnitSchema,
} from '@/lib/validators'
import { adminProcedure, createTRPCRouter, protectedProcedure } from '../trpc'

export const accountingUnitRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.accountingUnit.findMany()
  }),
  create: adminProcedure
    .input(createAccountingUnitSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.accountingUnit.create({
        data: {
          name: input.name,
        },
      })
    }),
  update: adminProcedure
    .input(updateAccountingUnitSchema)
    .mutation(async ({ ctx, input }) => {
      const accountingUnit = await ctx.db.accountingUnit.findUnique({
        where: { id: input.id },
      })
      if (!accountingUnit) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Kostenstelle nicht gefunden',
        })
      }

      return ctx.db.accountingUnit.update({
        where: { id: input.id },
        data: { name: input.name, updatedAt: new Date() },
      })
    }),
  delete: adminProcedure
    .input(deleteAccountingUnitSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.accountingUnit.delete({
        where: { id: input.id },
      })
    }),
})
