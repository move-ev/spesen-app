import { formatElapsedTime } from "@/lib/time";
import { cn } from "@/lib/utils";
import type { Report, User } from "generated/prisma/client";
import { UserCircle2Icon } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { ReportStatusIcon } from "./icons/report";
import { Skeleton } from "./ui/skeleton";
import { UserAvatar } from "./user-avatar";

export type ReportWithUsersAndAmount = Report & {
  requestor: User;
  reviewer: User | null;
  totalAmount: string;
};

export function ReportList({
  className,
  reports,
  detailPath,
  ...props
}: React.ComponentProps<"ul"> & {
  reports: ReportWithUsersAndAmount[];
  /**
   * The path to the details page for the report. Use `:reportId` as the placeholder
   * for the report id.
   */
  detailPath: string;
}) {
  if (reports.length === 0) {
    return (
      <ul className={cn("", className)} {...props}>
        <li className="flex h-32 items-center justify-center p-8">
          <p className="text-muted-foreground text-sm font-medium">
            Keine Berichte gefunden
          </p>
        </li>
      </ul>
    );
  }

  return (
    <ul className={cn("flex flex-col", className)} {...props}>
      {reports.map((report) => (
        <ReportListItem
          key={report.id}
          report={report}
          detailPath={detailPath}
        />
      ))}
    </ul>
  );
}

function ReportListItem({
  className,
  report,
  detailPath,
  ...props
}: React.ComponentProps<"li"> & {
  report: ReportWithUsersAndAmount;
  detailPath: string;
}) {
  return (
    <li
      className={cn(
        "hover:bg-muted relative inset-0 flex items-center justify-start gap-4 border-b py-4 last:border-b-0",
        className,
      )}
      {...props}
    >
      <ReportStatusIcon status={report.status} colored className="size-4" />
      <Link
        className="text-foreground text-sm font-medium"
        href={detailPath.replace(":reportId", report.id)}
      >
        <span className="absolute inset-0 h-full w-full" />
        {report.title}
      </Link>
      <p className="text-muted-foreground text-sm">
        {formatElapsedTime(report.createdAt)}
      </p>
      <div className="mr-auto flex items-center justify-center gap-2">
        <UserAvatar user={report.requestor} className="size-4" />
        <p className="text-muted-foreground text-sm">{report.requestor.name}</p>
      </div>
      {report.reviewer ? (
        <div className="flex items-center justify-center gap-2">
          <UserAvatar user={report.reviewer} className="size-4" />
          <p className="text-muted-foreground text-sm">
            {report.reviewer.name}
          </p>
        </div>
      ) : (
        <UserCircle2Icon className="text-muted-foreground ml-auto size-4" />
      )}
      <p className="text-foreground text-sm font-medium">
        {report.totalAmount} EUR
      </p>
    </li>
  );
}

export function ReportListSkeleton({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="report-list-skeleton"
      className={cn("space-y-2", className)}
      {...props}
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} className="h-8 w-full" />
      ))}
    </ul>
  );
}
