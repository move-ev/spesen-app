import { AdminReportDetailsHeaderSection } from './_components/header'
import { AdminReportDetailsSummarySection } from './_components/summary'

export default async function ServerPage({
  params,
}: {
  params: Promise<{
    reportId: string
  }>
}) {
  const { reportId } = await params

  return (
    <div>
      <AdminReportDetailsHeaderSection reportId={reportId} />
      <AdminReportDetailsSummarySection reportId={reportId} className="mt-20" />
    </div>
  )
}
