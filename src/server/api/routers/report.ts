import { ReportStatus } from "generated/prisma/enums";
import { adminProcedure, createTRPCRouter } from "../trpc";

export const reportRouter = createTRPCRouter({
  getStats: adminProcedure.query(async ({ ctx }) => {
    const grouped = await ctx.db.report.groupBy({
      by: ["status"],
      _count: { _all: true },
    });

    return Object.fromEntries(
      grouped.map((row) => [row.status, row._count._all]),
    ) as Record<ReportStatus, number>;
  }),
});
