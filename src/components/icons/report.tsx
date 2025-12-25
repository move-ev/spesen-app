import type { ReportStatus } from 'generated/prisma/enums'
import { BookDashedIcon, CircleDashedIcon } from 'lucide-react'
import type React from 'react'
import { cn } from '@/lib/utils'

export function ReportStatusIcon({
  status,
  className,
  colored = true,
  ...props
}: React.ComponentProps<'svg'> & {
  status: ReportStatus
  colored?: boolean
}) {
  let Icon = null
  let color: string

  switch (status) {
    case 'DRAFT':
      Icon = BookDashedIcon
      color = 'text-gray-500'
      break
    case 'IN_REVIEW':
      Icon = CircleDashedIcon
      color = 'text-zinc-500'
      break
    default:
      Icon = BookDashedIcon
      color = 'text-gray-500'
      break
  }

  return <Icon className={cn(colored && color, className)} {...props} />
}
