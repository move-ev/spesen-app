import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
} from 'date-fns'

export function formatElapsedTime(date: Date) {
  const currentDate = new Date()

  const elapsedMinutes = differenceInMinutes(currentDate, date)

  if (elapsedMinutes < 60) {
    return `vor ${elapsedMinutes} Minuten`
  }

  const elapsedHours = differenceInHours(currentDate, date)
  if (elapsedHours < 24) {
    return `vor ${elapsedHours} Stunden`
  }

  const elapsedDays = differenceInDays(currentDate, date)
  if (elapsedDays < 7) {
    return `vor ${elapsedDays} Tagen`
  }

  return `am ${format(date, 'dd.MM.yyyy')} um ${format(date, 'HH:mm')} Uhr`
}
