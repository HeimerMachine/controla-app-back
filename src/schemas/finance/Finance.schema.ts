import { z } from "zod";

export const CreateFinanceSchema = z.object({
    amount: z.number().min(0.01, "Amount must be a positive number"),
    description: z.string().min(1, "Description is required"),
    date: z.date(),
    type: z.enum(["income", "expense"], {
        errorMap: () => ({ message: "Type must be either 'income' or 'expense'" }),
    }),
});

export const UpdateFinanceSchema = z.object({
    amount: z.number().optional(),
    description: z.string().optional(),
    date: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }).optional(),
});