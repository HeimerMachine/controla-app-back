import { z } from "zod";

export const RegiserUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email("Incorrect format for email").transform((email) => email.toLowerCase()),
    password: z.string().min(8, "Password with lenght 8 is required"),
    confirmPassword: z.string().min(8, "Confirm password with lenght 8 is required"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match", 
});

export const LoginUserSchema = z.object({
    email: z.string().email("Incorrect format for email").transform((email) => email.toLowerCase()),
    password: z.string().min(8, "Password with lenght 8 is required"),
});

export const UpdateUserSchema = z.object({
    name: z.string().optional(),
    email: z.string().email("Incorrect format for email").transform((email) => email.toLowerCase()).optional(),
});

export const IdUserSchema = z.object({
    userId: z.string().uuid({ message: "UserId must be a valid UUID" })
});