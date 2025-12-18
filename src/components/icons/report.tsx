import { cn } from "@/lib/utils";
import type { ReportStatus } from "generated/prisma/enums";
import { BookDashedIcon, SquareIcon } from "lucide-react";
import type React from "react";

export function ReportStatusIcon({
  status,
  className,
  colored = true,
  ...props
}: React.ComponentProps<"svg"> & {
  status: ReportStatus;
  colored?: boolean;
}) {
  let Icon = null;
  let color: string;

  switch (status) {
    case "DRAFT":
      Icon = BookDashedIcon;
      color = "text-gray-500";
      break;
    case "IN_REVIEW":
      Icon = SquareIcon;
      color = "text-blue-500";
      break;
    default:
      Icon = BookDashedIcon;
      color = "text-gray-500";
      break;
  }

  return <Icon className={cn(colored && color, className)} {...props} />;
}
