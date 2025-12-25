import { cn } from '@/lib/utils'
import { api } from '@/trpc/server'
import { AcceptedCount } from './stats/accepted-count'
import { InReviewCount } from './stats/in-review-count'
import { OpenAmount } from './stats/open-amount'
import { RejectedCount } from './stats/rejected-count'

export default async function AdminStats({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  void api.report.countAccepted.prefetch()
  void api.report.countRejected.prefetch()
  void api.report.countInReview.prefetch()
  void api.report.countOpenAmount.prefetch()

  return (
    <div
      data-slot="admin-stats"
      className={cn('grid grid-cols-4 gap-0 divide-x border', className)}
      {...props}
    >
      <OpenAmount className="p-6" />
      <InReviewCount className="p-6" />
      <RejectedCount className="p-6" />
      <AcceptedCount className="p-6" />
    </div>
  )
}
