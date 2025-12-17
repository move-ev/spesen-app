import { CreateBusinessUnitForm } from "@/components/forms/create-business-unit";
import { PageTitle } from "@/components/page-title";
import { BusinessUnitsTable } from "@/components/tables/business-units";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { api } from "@/trpc/server";
import { PlusIcon } from "lucide-react";

export default async function ServerPage() {
  void api.businessUnit.list.prefetch();

  return (
    <div>
      <header className="flex flex-wrap items-center justify-between gap-4">
        <PageTitle>Geschäftseinheiten</PageTitle>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"outline"}>
              <PlusIcon />
              Geschäftseinheit erstellen
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Geschäftseinheit erstellen</SheetTitle>
              <SheetDescription>
                Erstelle eine neue Geschäftseinheit
              </SheetDescription>
            </SheetHeader>
            <div className="p-4">
              <CreateBusinessUnitForm />
            </div>
          </SheetContent>
        </Sheet>
      </header>
      <div className="mt-12">
        <BusinessUnitsTable />
      </div>
    </div>
  );
}
