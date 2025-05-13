import { z } from "zod";
import { errorResponses } from "./Error.schema.js";

export const UserSchema = z.object({
    name: z.string().min(1),
    email: z.string().email().transform((email) => email.toLowerCase()),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
});

export const RegisterUserSchema = {
    tags: ["user"],
    body: UserSchema,
    response: {
        200: z.object({
            message: z.string(),
        }),
        ...errorResponses,
    },
};