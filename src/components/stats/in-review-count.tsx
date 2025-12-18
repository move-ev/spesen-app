"use client";

import { cn, translateReportStatus } from "@/lib/utils";
import { api } from "@/trpc/react";
import type React from "react";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import { StatsCard } from "./stats-card";

export function InReviewCount({
  ...props
}: Omit<React.ComponentProps<typeof StatsCard>, "label">) {
  return (
    <StatsCard label={translateReportStatus("IN_REVIEW")} {...props}>
      <Suspense fallback={<Skeleton className="h-10 w-full max-w-24" />}>
        <Value />
      </Suspense>
    </StatsCard>
  );
}

function Value({ className, ...props }: React.ComponentProps<"p">) {
  const [count] = api.report.countInReview.useSuspenseQuery();

  return (
    <p
      data-slot="count-value"
      className={cn("text-foreground text-xl font-semibold", className)}
      {...props}
    >
      {count}
    </p>
  );
}
