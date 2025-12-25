import { PlusIcon } from 'lucide-react'
import { CreateAccountingUnitForm } from '@/components/forms/create-accounting-unit'
import { PageTitle } from '@/components/page-title'
import { AccountingUnitsTable } from '@/components/tables/accounting-units'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { api } from '@/trpc/server'

export default async function ServerPage() {
  void api.accountingUnit.list.prefetch()

  return (
    <div>
      <header className="flex flex-wrap items-center justify-between gap-4">
        <PageTitle>Kostenstellen</PageTitle>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={'outline'}>
              <PlusIcon />
              Kostenstelle erstellen
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Kostenstelle erstellen</SheetTitle>
              <SheetDescription>
                Erstelle eine neue Kostenstelle
              </SheetDescription>
            </SheetHeader>
            <div className="p-4">
              <CreateAccountingUnitForm />
            </div>
          </SheetContent>
        </Sheet>
      </header>
      <div className="mt-12">
        <AccountingUnitsTable />
      </div>
    </div>
  )
}
