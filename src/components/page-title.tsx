import type React from 'react'
import { cn } from '@/lib/utils'

export function PageTitle({ className, ...props }: React.ComponentProps<'h1'>) {
  return (
    <h1
      data-slot={'page-title'}
      className={cn('text-xl font-semibold', className)}
      {...props}
    />
  )
}

export function PageDescription({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot={'page-description'}
      className={cn(
        'text-muted-foreground text-sm leading-normal font-normal',
        className,
      )}
      {...props}
    />
  )
}

export function PageSubtitle({
  className,
  ...props
}: React.ComponentProps<'h3'>) {
  return (
    <h3
      data-slot={'page-subtitle'}
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  )
}
