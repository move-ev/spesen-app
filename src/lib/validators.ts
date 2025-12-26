import z from 'zod'

// Business Unit
export const createBusinessUnitSchema = z.object({
  name: z.string().min(1),
})

export const updateBusinessUnitSchema = z.object({
  id: z.cuid(),
  name: z.string().min(1),
})

export const deleteBusinessUnitSchema = z.object({
  id: z.cuid(),
})

// Accounting Unit
export const createAccountingUnitSchema = z.object({
  name: z.string().min(1),
})

export const updateAccountingUnitSchema = z.object({
  id: z.cuid(),
  name: z.string().min(1),
})

export const deleteAccountingUnitSchema = z.object({
  id: z.cuid(),
})

// Report
export const getReportByIdSchema = z.object({
  id: z.string().min(1),
})

export const createReportSchema = z.object({
  title: z.string().min(1),
  reason: z.string().min(1),
  businessUnitId: z.string().min(1),
  accountingUnitId: z.string().min(1),
})
