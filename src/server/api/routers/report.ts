import { adminProcedure, createTRPCRouter } from "../trpc";

export const reportRouter = createTRPCRouter({
  countAccepted: adminProcedure.query(async ({ ctx }) => {
    return ctx.db.report.count({
      where: {
        status: "APPROVED",
      },
    });
  }),
  countRejected: adminProcedure.query(async ({ ctx }) => {
    return ctx.db.report.count({
      where: {
        status: "REJECTED",
      },
    });
  }),
  countInReview: adminProcedure.query(async ({ ctx }) => {
    return ctx.db.report.count({
      where: {
        status: "IN_REVIEW",
      },
    });
  }),
  countOpenAmount: adminProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.expense.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        report: {
          status: "APPROVED",
        },
      },
    });

    return result._sum.amount?.toFixed(2) ?? "0.00";
  }),
});
