"use client";

import { api } from "@/trpc/react";
import { ReportList } from "./report-list";

export function AdminReportListRejected() {
  const [inReview] = api.report.listRejected.useSuspenseQuery();

  return (
    <ReportList reports={inReview} detailPath="/admin/reports/:reportId" />
  );
}

export function AdminReportListInReview() {
  const [inReview] = api.report.listInReview.useSuspenseQuery();

  return (
    <ReportList reports={inReview} detailPath="/admin/reports/:reportId" />
  );
}
