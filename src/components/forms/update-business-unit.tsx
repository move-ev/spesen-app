"use client";

import { updateBusinessUnitSchema } from "@/lib/validators";
import { api } from "@/trpc/react";
import { useForm } from "@tanstack/react-form";
import type { BusinessUnit } from "generated/prisma/client";
import { Loader2Icon } from "lucide-react";
import type React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export function UpdateBusinessUnitForm({
  unit,
  ...props
}: React.ComponentProps<"form"> & {
  unit: BusinessUnit;
}) {
  const utils = api.useUtils();

  const updateBusinessUnit = api.businessUnit.update.useMutation({
    onSuccess: () => {
      utils.businessUnit.list.invalidate();
      form.reset();
    },
    onError: (error) => {
      toast.error("Ein Fehler ist aufgetreten", {
        description: error.message ?? "Ein unerwarteter Fehler ist aufgetreten",
      });
    },
  });

  const deleteBusinessUnit = api.businessUnit.delete.useMutation({
    onSuccess: () => {
      utils.businessUnit.list.invalidate();
      form.reset();
    },
    onError: (error) => {
      toast.error("Ein Fehler ist aufgetreten", {
        description: error.message ?? "Ein unerwarteter Fehler ist aufgetreten",
      });
    },
  });

  const form = useForm({
    defaultValues: {
      id: unit.id,
      name: unit.name,
    },
    validators: {
      onSubmit: updateBusinessUnitSchema,
    },
    onSubmit: async ({ value }) => {
      updateBusinessUnit.mutate(value);
    },
  });

  return (
    <form
      id="update-business-unit-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      {...props}
    >
      <FieldGroup>
        <form.Field
          name="name"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Geschäftsbereich"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <Button
          type="submit"
          form="update-business-unit-form"
          disabled={
            updateBusinessUnit.isPending || deleteBusinessUnit.isPending
          }
        >
          {updateBusinessUnit.isPending ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <span>Geschäftsbereich aktualisieren</span>
          )}
        </Button>
        <Button
          type="button"
          variant={"destructive"}
          onClick={() => deleteBusinessUnit.mutate({ id: unit.id })}
          disabled={
            deleteBusinessUnit.isPending || updateBusinessUnit.isPending
          }
        >
          {deleteBusinessUnit.isPending ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <span>Geschäftsbereich löschen</span>
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
