"use client";

import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import type React from "react";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import { StatsCard } from "./stats-card";

export function OpenAmount({
  ...props
}: Omit<React.ComponentProps<typeof StatsCard>, "label">) {
  return (
    <StatsCard label="Offene Beträge" {...props}>
      <Suspense fallback={<Skeleton className="h-10 w-full max-w-24" />}>
        <Value />
      </Suspense>
    </StatsCard>
  );
}

function Value({ className, ...props }: React.ComponentProps<"p">) {
  const [count] = api.report.countOpenAmount.useSuspenseQuery();

  return (
    <p
      data-slot="count-value"
      className={cn("text-foreground text-xl font-semibold", className)}
      {...props}
    >
      {Number(count).toFixed(2)} EUR
    </p>
  );
}
