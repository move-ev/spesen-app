import { ReportHeader } from "@/components/report-header";
import { APP_ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export async function AdminReportDetailsHeaderSection({
  reportId,
  className,
  ...props
}: React.ComponentProps<"section"> & {
  reportId: string;
}) {
  void api.report.getHeaderDetails.prefetch({
    id: reportId,
  });

  return (
    <section
      className={cn("mx-auto w-full max-w-384 px-8", className)}
      {...props}
    >
      <Link
        href={APP_ROUTES.ADMIN}
        className="text-primary flex items-center justify-start gap-1.5 text-sm font-medium"
      >
        <ArrowLeftIcon className="size-3.5" />
        Alle Berichte
      </Link>
      <ReportHeader reportId={reportId} className="mt-4" />
    </section>
  );
}
