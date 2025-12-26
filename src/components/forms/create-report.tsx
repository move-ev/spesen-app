'use client'

import { useForm } from '@tanstack/react-form'
import { Loader2Icon } from 'lucide-react'
import type React from 'react'
import { toast } from 'sonner'
import { createReportSchema } from '@/lib/validators'
import { api } from '@/trpc/react'
import { Button } from '../ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Textarea } from '../ui/textarea'

export function CreateReportForm({ ...props }: React.ComponentProps<'form'>) {
  const [accountingUnits] = api.accountingUnit.list.useSuspenseQuery()
  const [businessUnits] = api.businessUnit.list.useSuspenseQuery()

  const utils = api.useUtils()
  const createReport = api.report.create.useMutation({
    onSuccess: () => {
      //   utils.report.list.invalidate()
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
      title: '',
      reason: '',
      businessUnitId: '',
      accountingUnitId: '',
    },
    validators: {
      onSubmit: createReportSchema,
    },
    onSubmit: async ({ value }) => {
      createReport.mutate(value)
    },
  })

  return (
    <form
      id="create-report-form"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      {...props}
    >
      <FieldGroup>
        <form.Field
          name="title"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Titel</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Titel"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <form.Field
          name="reason"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Begründung</FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Begründung"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <form.Field
          name="businessUnitId"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Geschäftsbereich</FieldLabel>
                <Select
                  onValueChange={(value) => field.handleChange(value)}
                  value={field.state.value}
                  aria-invalid={isInvalid}
                >
                  <SelectTrigger id={field.name} name={field.name}>
                    <SelectValue placeholder="Geschäftsbereich wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessUnits.map((businessUnit) => (
                      <SelectItem key={businessUnit.id} value={businessUnit.id}>
                        {businessUnit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <form.Field
          name="accountingUnitId"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Kostenstelle</FieldLabel>
                <Select
                  onValueChange={(value) => field.handleChange(value)}
                  value={field.state.value}
                  aria-invalid={isInvalid}
                >
                  <SelectTrigger id={field.name} name={field.name}>
                    <SelectValue placeholder="Kostenstelle wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {accountingUnits.map((accountingUnit) => (
                        <SelectItem
                          key={accountingUnit.id}
                          value={accountingUnit.id}
                        >
                          {accountingUnit.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <Button
          type="submit"
          form="create-report-form"
          disabled={createReport.isPending}
        >
          {createReport.isPending ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <span>Bericht erstellen</span>
          )}
        </Button>
      </FieldGroup>
    </form>
  )
}
