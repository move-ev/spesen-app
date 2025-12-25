'use client'

import { useForm } from '@tanstack/react-form'
import { Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'
import { createAccountingUnitSchema } from '@/lib/validators'
import { api } from '@/trpc/react'
import { Button } from '../ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'

export function CreateAccountingUnitForm() {
  const utils = api.useUtils()
  const createAccountingUnit = api.accountingUnit.create.useMutation({
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
      name: '',
    },
    validators: {
      onSubmit: createAccountingUnitSchema,
    },
    onSubmit: async ({ value }) => {
      createAccountingUnit.mutate(value)
    },
  })

  return (
    <form
      id="create-accounting-unit-form"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
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
          form="create-accounting-unit-form"
          disabled={createAccountingUnit.isPending}
        >
          {createAccountingUnit.isPending ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <span>Kostenstelle erstellen</span>
          )}
        </Button>
      </FieldGroup>
    </form>
  )
}
