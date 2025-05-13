import { Router, Request, Response } from "express";
import UserController from "../../controllers/UserController.js";
import { RegiserUserSchema } from "../../schemas/User.schema.js";
import { fromZodError } from "zod-validation-error";
import { z } from "zod";

export const UserPublicRoute = Router();

UserPublicRoute.post("/register", async (req: Request, res: Response) => {
    const validatedBody = validateRequestBody(RegiserUserSchema, req);
    await UserController.register(validatedBody, res);
});

function validateRequestBody(schema: z.ZodSchema, req: Request) {
    const results = schema.safeParse(req.body);
    if (!results.success) {
        throw new Error(fromZodError(results.error).message); //TODO: MIDDLEWARE ERROR HANDLER
    }
    return results.data;
}  