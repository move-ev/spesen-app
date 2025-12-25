'use client'

import { formatElapsedTime } from '@/lib/time'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'
import { PageDescription, PageTitle } from './page-title'
import { ReportStatusBadge } from './report-status-badge'

export function ReportHeader({
  reportId,
  className,
  ...props
}: React.ComponentProps<'div'> & { reportId: string }) {
  const [report] = api.report.getHeaderDetails.useSuspenseQuery({
    id: reportId,
  })

  return (
    <div data-slot="report-header" className={cn('', className)} {...props}>
      <div className="flex items-center justify-start gap-4">
        <PageTitle>{report.title}</PageTitle>
        <ReportStatusBadge status={report.status} />
      </div>
      <PageDescription className="mt-2">
        {formatElapsedTime(report.createdAt)} <span className="mx-2">•</span>
        {report.totalAmount} EUR
      </PageDescription>
    </div>
  )
}
