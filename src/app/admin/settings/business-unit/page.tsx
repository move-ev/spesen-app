import { PageTitle } from "@/components/page-title";
import { BusinessUnitsTable } from "@/components/tables/business-units";
import { api } from "@/trpc/server";

export default async function ServerPage() {
  void api.businessUnit.list.prefetch();

  return (
    <div>
      <header>
        <PageTitle>Geschäftseinheiten</PageTitle>
      </header>
      <div className="mt-12">
        <BusinessUnitsTable />
      </div>
    </div>
  );
}
