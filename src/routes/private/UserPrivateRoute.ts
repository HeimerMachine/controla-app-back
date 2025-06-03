import { NameRequiredError } from "@helpers/user-errors/nameRequiredError";
import { InvalidEmailError } from "@helpers/user-errors/invalidEmailError";
import { UpdateUserSchema } from "@schemas/User.schema";
import { Request, Response, Router } from "express";
import { z } from "zod";
import UserController from "../../controllers/UserController";
import authMiddleware from "../../middleware/authMiddleware";


export const UserPrivateRoute = Router();

UserPrivateRoute.delete("/:userId", authMiddleware, async (req: Request, res: Response) => {
    const authenticatedUserId = res.locals.user.id;
    await UserController.delete(authenticatedUserId, res);
});
UserPrivateRoute.put("/:userId", authMiddleware, async (req: Request, res: Response) => {
    const authenticatedUserId = res.locals.user.id;
    const validateBody = validateRequestBody(UpdateUserSchema, req);
    await UserController.update(authenticatedUserId, validateBody, res);
});



function validateRequestBody(schema: z.ZodSchema, req: Request) {
    const results = schema.safeParse(req.body);
    if (!results.success) {
        const errors = results.error.errors[0];
        if(errors.message == "Name is required") {
            throw new NameRequiredError();
        }
        if (errors.message == "Incorrect format for email") {
            throw new InvalidEmailError();
        }
        throw new Error(`Internal server error`);
    }
    return results.data;
}  
  