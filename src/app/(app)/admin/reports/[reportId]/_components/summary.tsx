import { PageSubtitle } from "@/components/page-title";
import { ReportSummary } from "@/components/report-summary";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/server";

export async function AdminReportDetailsSummarySection({
  reportId,
}: {
  reportId: string;
}) {
  void api.report.getById.prefetch({
    id: reportId,
  });

  return (
    <section className="mx-auto w-full max-w-384 px-8">
      <PageSubtitle>Zusammenfassung</PageSubtitle>
      <Separator className="mt-4 mb-6" />
      <ReportSummary reportId={reportId} />
    </section>
  );
}
