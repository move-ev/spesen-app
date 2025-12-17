import z from "zod";

export const createBusinessUnitSchema = z.object({
  name: z.string().min(1),
});
