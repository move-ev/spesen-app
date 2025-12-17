"use client";

import { api } from "@/trpc/react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export function BusinessUnitsTable() {
  const [units] = api.businessUnit.list.useSuspenseQuery();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Erstellt</TableHead>
          <TableHead className="text-right">Aktionen</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {units.map((unit) => (
          <TableRow key={unit.id}>
            <TableCell>{unit.name}</TableCell>
            <TableCell>
              {format(unit.createdAt, "dd.MM.yyyy")} um{" "}
              {format(unit.createdAt, "HH:mm")} Uhr{" "}
            </TableCell>
          </TableRow>
        ))}

        {units.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={3}
              className="text-muted-foreground h-32 text-center"
            >
              Keine Geschäftseinheiten gefunden
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
