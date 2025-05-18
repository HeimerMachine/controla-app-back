import { Router, Request, Response } from "express";
import UserController from "../../controllers/UserController";
import { LoginUserSchema, RegiserUserSchema } from "@schemas/User.schema";
import { z } from "zod";
import { PasswordNotMatchError } from "@helpers/user-errors/passwordNotMatchError";
import { NameRequiredError } from "@helpers/user-errors/nameRequiredError";
import { InvalidEmailError } from "@helpers/user-errors/invalidEmailError";
import { InvalidPasswordError } from "@helpers/user-errors/invalidPasswordError.js";

export const UserPublicRoute = Router();

UserPublicRoute.post("/register", async (req: Request, res: Response) => {
    const validatedBody = validateRequestBody(RegiserUserSchema, req);
    await UserController.register(validatedBody, res);
});
UserPublicRoute.post("/login", async (req: Request, res: Response) => {
    const validatedBody = validateRequestBody(LoginUserSchema, req);
    await UserController.login(validatedBody, res);

});

function validateRequestBody(schema: z.ZodSchema, req: Request) {
    const results = schema.safeParse(req.body);
    if (!results.success) {
        const errors = results.error.errors[0];
        if (errors.message == "Passwords don't match") {
            throw new PasswordNotMatchError();
        }
        if (errors.message == "Incorrect format for email") {
            throw new InvalidEmailError();
        }
        if(errors.message == "Name is required") {
            throw new NameRequiredError();
        }
        if(errors.message == "Password with lenght 8 is required") {
            throw new InvalidPasswordError();
        }
        throw new Error(`Internal server error`);
    }
    return results.data;
}  