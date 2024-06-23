import { z } from "zod";

export const addItemSchema = z.object({
    size: z.string().min(1, { message: "Size is required" }),
    quantity: z
      .string()
      .refine((val) => !isNaN(Number(val)), {
        message: "Quantity must be a number",
      })
      .transform((val) => Number(val))
      .refine((val) => val >= 1, {
        message: "Quantity must be at least 1",
      }),
  });