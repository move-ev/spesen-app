import { TRPCError } from '@trpc/server'
import {
  createBusinessUnitSchema,
  deleteBusinessUnitSchema,
  updateBusinessUnitSchema,
} from '@/lib/validators'
import { adminProcedure, createTRPCRouter, protectedProcedure } from '../trpc'

export const businessUnitRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.businessUnit.findMany()
  }),
  create: adminProcedure
    .input(createBusinessUnitSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.businessUnit.create({
        data: {
          name: input.name,
        },
      })
    }),
  update: adminProcedure
    .input(updateBusinessUnitSchema)
    .mutation(async ({ ctx, input }) => {
      const businessUnit = await ctx.db.businessUnit.findUnique({
        where: { id: input.id },
      })
      if (!businessUnit) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Geschäftseinheit nicht gefunden',
        })
      }

      return ctx.db.businessUnit.update({
        where: { id: input.id },
        data: { name: input.name, updatedAt: new Date() },
      })
    }),
  delete: adminProcedure
    .input(deleteBusinessUnitSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.businessUnit.delete({
        where: { id: input.id },
      })
    }),
})
