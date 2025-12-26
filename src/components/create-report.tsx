import { PlusIcon } from 'lucide-react'
import type React from 'react'
import { Suspense } from 'react'
import { api } from '@/trpc/server'
import { CreateReportForm } from './forms/create-report'
import { Button } from './ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { Skeleton } from './ui/skeleton'

export async function CreateReport({
  ...props
}: React.ComponentProps<typeof Sheet>) {
  void api.accountingUnit.list.prefetch()
  void api.businessUnit.list.prefetch()

  return (
    <Sheet {...props}>
      <SheetTrigger>
        <Button variant={'outline'}>
          <PlusIcon />
          Bericht erstellen
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Bericht erstellen</SheetTitle>
        </SheetHeader>
        <div className="p-4">
          <Suspense fallback={<CreateReportContentSkeleton />}>
            <CreateReportForm />
          </Suspense>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function CreateReportContentSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-8 w-full" />
      ))}
    </div>
  )
}
