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
  /**
   * TODO: Add status filter
   */
  countOpenAmount: adminProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.expense.aggregate({
      _sum: {
        amount: true,
      },
      //   where: {
      //     report: {
      //       status: "",
      //     },
      //   },
    });

    return result._sum.amount?.toFixed(2) ?? "0.00";
  }),
  listAll: adminProcedure.query(async ({ ctx }) => {
    const reports = await ctx.db.report.findMany({
      include: {
        requestor: true,
        reviewer: true,
        expenses: {
          select: {
            amount: true,
          },
        },
      },
    });

    return reports.map((report) => ({
      ...report,
      totalAmount: report.expenses
        .reduce((sum, expense) => sum + Number(expense.amount), 0)
        .toFixed(2),
    }));
  }),
  listInReview: adminProcedure.query(async ({ ctx }) => {
    const reports = await ctx.db.report.findMany({
      where: {
        status: "IN_REVIEW",
      },
      include: {
        requestor: true,
        reviewer: true,
        expenses: {
          select: {
            amount: true,
          },
        },
      },
    });

    return reports.map((report) => ({
      ...report,
      totalAmount: report.expenses
        .reduce((sum, expense) => sum + Number(expense.amount), 0)
        .toFixed(2),
    }));
  }),
  listRejected: adminProcedure.query(async ({ ctx }) => {
    const reports = await ctx.db.report.findMany({
      where: {
        status: "REJECTED",
      },
      include: {
        requestor: true,
        reviewer: true,
        expenses: {
          select: {
            amount: true,
          },
        },
      },
    });

    return reports.map((report) => ({
      ...report,
      totalAmount: report.expenses
        .reduce((sum, expense) => sum + Number(expense.amount), 0)
        .toFixed(2),
    }));
  }),
});
