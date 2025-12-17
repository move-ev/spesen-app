import { cn } from "@/lib/utils";
import type React from "react";

export function PageTitle({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot={"page-title"}
      className={cn("text-2xl font-semibold", className)}
      {...props}
    />
  );
}
