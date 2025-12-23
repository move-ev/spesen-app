import { cn, translateReportStatus } from "@/lib/utils";
import type { ReportStatus } from "generated/prisma/enums";
import { CircleIcon } from "lucide-react";
import type React from "react";
import { Badge } from "./ui/badge";

export function ReportStatusBadge({
  status,
  ...props
}: React.ComponentProps<typeof Badge> & { status: ReportStatus }) {
  let color: string;
  switch (status) {
    case "DRAFT":
      color = "text-gray-500 fill-gray-500";
      break;
    case "IN_REVIEW":
      color = "text-zinc-500 fill-zinc-500";
      break;
    case "EDIT_REQUIRED":
      color = "text-yellow-500 fill-yellow-500";
      break;
    case "REJECTED":
      color = "text-red-500 fill-red-500";
      break;
    case "APPROVED":
      color = "text-green-500 fill-green-500";
      break;
    case "CLEARED":
      color = "text-gray-500 fill-gray-500";
      break;
  }

  return (
    <Badge variant={"outline"} {...props}>
      <CircleIcon className={cn(color, "me-1 size-2.5!")} />{" "}
      {translateReportStatus(status)}
    </Badge>
  );
}
