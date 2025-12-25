import { cn } from "@/lib/utils";

export function ExpensesTable({
  className,
  ...props
}: React.ComponentProps<"table">) {
  return (
    <table
      datat-slot="expenses-table"
      className={cn("caption-bottom text-sm", className)}
      {...props}
    />
  );
}

export function ExpensesTableHeader() {}

export function ExpensesTableHead() {}

export function ExpensesTableBody() {}

export function ExpensesTableRow() {}

export function ExpensesTableCell() {}
