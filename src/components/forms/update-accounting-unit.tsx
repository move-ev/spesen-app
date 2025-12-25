'use client'

import { useForm } from '@tanstack/react-form'
import type { AccountingUnit } from 'generated/prisma/client'
import { Loader2Icon } from 'lucide-react'
import type React from 'react'
import { toast } from 'sonner'
import { updateAccountingUnitSchema } from '@/lib/validators'
import { api } from '@/trpc/react'
import { Button } from '../ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'

export function UpdateAccountingUnitForm({
  unit,
  ...props
}: React.ComponentProps<'form'> & {
  unit: AccountingUnit
}) {
  const utils = api.useUtils()

  const updateAccountingUnit = api.accountingUnit.update.useMutation({
    onSuccess: () => {
      utils.accountingUnit.list.invalidate()
      form.reset()
    },
    onError: (error) => {
      toast.error('Ein Fehler ist aufgetreten', {
        description: error.message ?? 'Ein unerwarteter Fehler ist aufgetreten',
      })
    },
  })

  const deleteAccountingUnit = api.accountingUnit.delete.useMutation({
    onSuccess: () => {
      utils.accountingUnit.list.invalidate()
      form.reset()
    },
    onError: (error) => {
      toast.error('Ein Fehler ist aufgetreten', {
        description: error.message ?? 'Ein unerwarteter Fehler ist aufgetreten',
      })
    },
  })

  const form = useForm({
    defaultValues: {
      id: unit.id,
      name: unit.name,
    },
    validators: {
      onSubmit: updateAccountingUnitSchema,
    },
    onSubmit: async ({ value }) => {
      updateAccountingUnit.mutate(value)
    },
  })

  return (
    <form
      id="update-accounting-unit-form"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      {...props}
    >
      <FieldGroup>
        <form.Field
          name="name"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
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
                  placeholder="Kostenstelle"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <Button
          type="submit"
          form="update-accounting-unit-form"
          disabled={
            updateAccountingUnit.isPending || deleteAccountingUnit.isPending
          }
        >
          {updateAccountingUnit.isPending ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <span>Kostenstelle aktualisieren</span>
          )}
        </Button>
        <Button
          type="button"
          variant={'destructive'}
          onClick={() => deleteAccountingUnit.mutate({ id: unit.id })}
          disabled={
            deleteAccountingUnit.isPending || updateAccountingUnit.isPending
          }
        >
          {deleteAccountingUnit.isPending ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <span>Kostenstelle löschen</span>
          )}
        </Button>
      </FieldGroup>
    </form>
  )
}
