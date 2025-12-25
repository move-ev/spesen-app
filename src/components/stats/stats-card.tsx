import type React from 'react'
import { cn } from '@/lib/utils'

export function StatsCard({
  className,
  label,
  children,
  ...props
}: Omit<React.ComponentProps<'div'>, 'label'> & {
  label: string
}) {
  return (
    <div
      data-slot="stats-card"
      className={cn(
        'flex min-h-32 flex-col items-start justify-between',
        className,
      )}
      {...props}
    >
      <p className="text-muted-foreground text-xs font-medium">{label}</p>
      {children}
    </div>
  )
}
