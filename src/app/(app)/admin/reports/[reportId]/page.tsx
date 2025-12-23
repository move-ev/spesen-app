import { api } from "@/trpc/server";
import { AdminReportDetailsSummarySection } from "./_components/summary";

export default async function ServerPage({
  params,
}: {
  params: Promise<{
    reportId: string;
  }>;
}) {
  const { reportId } = await params;

  void api.report.getById.prefetch({
    id: reportId,
  });

  return (
    <div>
      <AdminReportDetailsSummarySection reportId={reportId} />
    </div>
  );
}
