import z from "zod";

export const createBusinessUnitSchema = z.object({
  name: z.string().min(1),
});

export const updateBusinessUnitSchema = z.object({
  id: z.cuid(),
  name: z.string().min(1),
});

export const deleteBusinessUnitSchema = z.object({
  id: z.cuid(),
});
