"use client";

import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import { UserCircleIcon } from "lucide-react";
import { UserAvatar } from "./user-avatar";

export function ReportSummary({
  reportId,
  className,
  ...props
}: React.ComponentProps<"ul"> & { reportId: string }) {
  const [report] = api.report.getById.useSuspenseQuery({
    id: reportId,
  });

  return (
    <ul
      data-slot={"report-summary"}
      className={cn("grid grid-cols-3 gap-8", className)}
      {...props}
    >
      <ReportSummaryItem>
        <ReportSummaryItemLabel>Antragsteller</ReportSummaryItemLabel>
        <ReportSummaryItemValue>
          <UserAvatar user={report.requestor} className="size-3.5" />
          <span>{report.requestor.name}</span>
        </ReportSummaryItemValue>
      </ReportSummaryItem>
      <ReportSummaryItem>
        <ReportSummaryItemLabel>Erstellt</ReportSummaryItemLabel>
        <ReportSummaryItemValue>
          {format(report.createdAt, "dd.MM.yyyy")} um{" "}
          {format(report.createdAt, "HH:mm")} Uhr
        </ReportSummaryItemValue>
      </ReportSummaryItem>
      <ReportSummaryItem>
        <ReportSummaryItemLabel>Zuletzt aktualisiert</ReportSummaryItemLabel>
        <ReportSummaryItemValue>
          {format(report.updatedAt, "dd.MM.yyyy")} um{" "}
          {format(report.updatedAt, "HH:mm")} Uhr
        </ReportSummaryItemValue>
      </ReportSummaryItem>
      <ReportSummaryItem>
        <ReportSummaryItemLabel>Geschäftseinheit</ReportSummaryItemLabel>
        <ReportSummaryItemValue>
          {report.businessUnit.name}
        </ReportSummaryItemValue>
      </ReportSummaryItem>
      <ReportSummaryItem>
        <ReportSummaryItemLabel>Kostenstelle</ReportSummaryItemLabel>
        <ReportSummaryItemValue>
          {report.accountingUnit.name}
        </ReportSummaryItemValue>
      </ReportSummaryItem>
      <ReportSummaryItem>
        <ReportSummaryItemLabel>Prüfer</ReportSummaryItemLabel>
        {report.reviewer ? (
          <ReportSummaryItemValue>
            <UserAvatar user={report.reviewer} className="size-3.5" />
            <span>{report.reviewer.name}</span>
          </ReportSummaryItemValue>
        ) : (
          <ReportSummaryItemValue>
            <UserCircleIcon />
            <span>Nicht zugewiesen</span>
          </ReportSummaryItemValue>
        )}
      </ReportSummaryItem>
      <ReportSummaryItem className="col-span-2">
        <ReportSummaryItemLabel>Begründung</ReportSummaryItemLabel>
        <ReportSummaryItemValue>{report.reason}</ReportSummaryItemValue>
      </ReportSummaryItem>
    </ul>
  );
}

function ReportSummaryItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return <li className={cn("space-y-1", className)} {...props} />;
}

function ReportSummaryItemLabel({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot={"report-summary-item-label"}
      className={cn("text-foreground text-sm font-medium", className)}
      {...props}
    />
  );
}

function ReportSummaryItemValue({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot={"report-summary-item-value"}
      className={cn(
        "flex max-w-prose items-center gap-2 text-sm text-zinc-500",
        "[&_svg]:size-3.5",
        className,
      )}
      {...props}
    />
  );
}
