import { getReportByIdSchema } from "@/lib/validators";
import { TRPCError } from "@trpc/server";
import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

export const reportRouter = createTRPCRouter({
  getHeaderDetails: protectedProcedure
    .input(getReportByIdSchema)
    .query(async ({ ctx, input }) => {
      const report = await ctx.db.report.findUnique({
        where: {
          id: input.id,
        },
        include: {
          expenses: {
            select: {
              amount: true,
            },
          },
        },
      });

      if (!report) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Report not found",
        });
      }

      if (
        ctx.session.user.role !== "admin" &&
        report.requestorId !== ctx.session.user.id
      ) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to view this report",
        });
      }

      return {
        ...report,
        totalAmount: report.expenses.reduce(
          (acc, expense) => acc + Number(expense.amount),
          0,
        ),
      };
    }),
  getExpenses: protectedProcedure
    .input(getReportByIdSchema)
    .query(async ({ ctx, input }) => {
      const expenses = await ctx.db.expense.findMany({
        where: {
          reportId: input.id,
        },
      });

      if (!expenses) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Expenses not found",
        });
      }

      return expenses;
    }),
  getById: protectedProcedure
    .input(getReportByIdSchema)
    .query(async ({ ctx, input }) => {
      const report = await ctx.db.report.findUnique({
        where: {
          id: input.id,
        },
        include: {
          requestor: true,
          accountingUnit: true,
          businessUnit: true,
          reviewer: true,
        },
      });

      if (!report) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Report not found" });
      }

      if (
        ctx.session.user.role !== "admin" &&
        report.requestorId !== ctx.session.user.id
      ) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to view this report",
        });
      }

      return report;
    }),
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
