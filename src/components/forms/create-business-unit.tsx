"use client";

import { createBusinessUnitSchema } from "@/lib/validators";
import { api } from "@/trpc/react";
import { useForm } from "@tanstack/react-form";
import { Loader2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export function CreateBusinessUnitForm() {
  const utils = api.useUtils();
  const createBusinessUnit = api.businessUnit.create.useMutation({
    onSuccess: () => {
      utils.businessUnit.list.invalidate();
      form.reset();
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onSubmit: createBusinessUnitSchema,
    },
    onSubmit: async ({ value }) => {
      createBusinessUnit.mutate(value);
    },
  });

  return (
    <form
      id="create-business-unit-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
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
          form="create-business-unit-form"
          disabled={createBusinessUnit.isPending}
        >
          {createBusinessUnit.isPending ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <span>Geschäftsbereich erstellen</span>
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
