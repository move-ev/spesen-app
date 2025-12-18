import {
  AdminReportListInReview,
  AdminReportListRejected,
} from "@/components/admin-report-lists";
import AdminStats from "@/components/admin-stats";
import { PageSubtitle, PageTitle } from "@/components/page-title";
import { ReportListSkeleton } from "@/components/report-list";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/trpc/server";
import { Suspense } from "react";

export default async function ServerPage() {
  void api.report.listRejected.prefetch();

  return (
    <>
      <header className="mx-auto w-full max-w-4xl px-8">
        <PageTitle>Admin</PageTitle>
      </header>
      <section className="mx-auto mt-8 w-full max-w-4xl px-8">
        <AdminStats />
      </section>
      <Tabs asChild defaultValue="pending">
        <section className="mx-auto mt-20 w-full max-w-4xl px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <PageSubtitle>Berichte</PageSubtitle>
            <TabsList>
              <TabsTrigger value="pending">Ausstehend</TabsTrigger>
              <TabsTrigger value="accepted">Angenommen</TabsTrigger>
              <TabsTrigger value="rejected">Abgelehnt</TabsTrigger>
            </TabsList>
          </div>
          <Separator className="mt-4 mb-6" />
          <div>
            <TabsContent value="pending">
              <Suspense fallback={<ReportListSkeleton />}>
                <AdminReportListInReview />
              </Suspense>
            </TabsContent>
            <TabsContent value="accepted">
              <Suspense fallback={<ReportListSkeleton />}>
                <AdminReportListRejected />
              </Suspense>
            </TabsContent>
            <TabsContent value="rejected">
              <Suspense fallback={<ReportListSkeleton />}>
                <AdminReportListRejected />
              </Suspense>
            </TabsContent>
          </div>
        </section>
      </Tabs>
    </>
  );
}
