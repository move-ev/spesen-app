'use client'

import type React from 'react'
import { Suspense } from 'react'
import { cn, translateReportStatus } from '@/lib/utils'
import { api } from '@/trpc/react'
import { Skeleton } from '../ui/skeleton'
import { StatsCard } from './stats-card'

export function RejectedCount({
  ...props
}: Omit<React.ComponentProps<typeof StatsCard>, 'label'>) {
  return (
    <StatsCard label={translateReportStatus('REJECTED')} {...props}>
      <Suspense fallback={<Skeleton className="h-10 w-full max-w-24" />}>
        <Value />
      </Suspense>
    </StatsCard>
  )
}

function Value({ className, ...props }: React.ComponentProps<'p'>) {
  const [count] = api.report.countRejected.useSuspenseQuery()

  return (
    <p
      data-slot="count-value"
      className={cn('text-foreground text-xl font-semibold', className)}
      {...props}
    >
      {count}
    </p>
  )
}
