"use client";

import { api } from "@/trpc/react";
import { format } from "date-fns";
import { EllipsisVerticalIcon } from "lucide-react";
import { UpdateAccountingUnitForm } from "../forms/update-accounting-unit";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export function AccountingUnitsTable() {
  const [units] = api.accountingUnit.list.useSuspenseQuery();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Erstellt</TableHead>
          <TableHead>Aktualisiert</TableHead>
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
            <TableCell>
              {format(unit.updatedAt, "dd.MM.yyyy")} um{" "}
              {format(unit.updatedAt, "HH:mm")} Uhr{" "}
            </TableCell>
            <TableCell className="flex justify-end">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant={"ghost"} size={"icon-sm"}>
                    <EllipsisVerticalIcon />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Kostenstelle aktualisieren</SheetTitle>
                  </SheetHeader>
                  <div className="p-4">
                    <UpdateAccountingUnitForm unit={unit} />
                  </div>
                </SheetContent>
              </Sheet>
            </TableCell>
          </TableRow>
        ))}

        {units.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={4}
              className="text-muted-foreground h-32 text-center"
            >
              Keine Kostenstellen gefunden
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
