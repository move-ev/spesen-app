import { cn } from "@/lib/utils";
import type React from "react";

export function PageTitle({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot={"page-title"}
      className={cn("text-xl font-semibold", className)}
      {...props}
    />
  );
}

export function PageDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot={"page-description"}
      className={cn(
        "text-muted-foreground text-sm leading-normal font-normal",
        className,
      )}
      {...props}
    />
  );
}
