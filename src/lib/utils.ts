import { type ClassValue, clsx } from 'clsx'
import type { ReportStatus } from 'generated/prisma/enums'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function translateReportStatus(status: ReportStatus): string {
  switch (status) {
    case 'APPROVED':
      return 'Angenommen'
    case 'IN_REVIEW':
      return 'In Prüfung'
    case 'EDIT_REQUIRED':
      return 'Bearbeitung erforderlich'
    case 'REJECTED':
      return 'Abgelehnt'
    case 'CLEARED':
      return 'Gelöscht'
    default:
      return 'Draft'
  }
}
