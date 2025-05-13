import { z } from "zod";

export const RegiserUserSchema = z.object({
    name: z.string().min(1),
    email: z.string().email().transform((email) => email.toLowerCase()),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
});