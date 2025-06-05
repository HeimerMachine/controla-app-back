import { z } from "zod";

const financeCategories = [
  "ALIMENTACAO",
  "SAUDE",
  "LAZER",
  "ROUPAS_E_ACESSORIOS",
  "DIVIDAS",
  "CONTAS",
  "OUTROS_TIPOS_DE_GASTOS",
] as const;

export const CreateFinanceSchema = z.object({
  amount: z.number().min(0.01, "Amount must be a positive number"),
  description: z.string().min(1, "Description is required"),
  date: z.string().datetime().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
    }),
  type: z.enum(["INCOME", "EXPENSE"], {
    errorMap: () => ({ message: "Type must be either 'income' or 'expense'" }),
  }),
  category: z.enum(financeCategories).optional(),
});

export const UpdateFinanceSchema = z.object({
    amount: z.number().optional(),
    description: z.string().optional(),
    date: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }).optional(),
});