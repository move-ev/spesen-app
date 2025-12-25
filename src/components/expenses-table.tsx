import { cn } from '@/lib/utils'

export function ExpensesTable({
  className,
  ...props
}: React.ComponentProps<'table'>) {
  return (
    <table
      data-slot="expenses-table"
      className={cn('', className)}
      {...props}
    />
  )
}

export function ExpensesTableHeader({
  className,
  ...props
}: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="expenses-table-header"
      className={cn('', className)}
      {...props}
    />
  )
}

export function ExpensesTableHead({
  className,
  ...props
}: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot="expenses-table-head"
      className={cn('', className)}
      {...props}
    />
  )
}

export function ExpensesTableBody({
  className,
  ...props
}: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="expenses-table-body"
      className={cn('', className)}
      {...props}
    />
  )
}

export function ExpensesTableRow({
  className,
  ...props
}: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="expenses-table-row"
      className={cn('', className)}
      {...props}
    />
  )
}

export function ExpensesTableCell({
  className,
  ...props
}: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="expenses-table-cell"
      className={cn('', className)}
      {...props}
    />
  )
}
