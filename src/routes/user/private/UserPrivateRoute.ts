import { NameRequiredError } from "@helpers/user-errors/nameRequiredError";
import { InvalidEmailError } from "@helpers/user-errors/invalidEmailError";
import { InvalidPasswordError } from "@helpers/user-errors/invalidPasswordError.js";
import { UpdateUserSchema, UpdateUserPasswordSchema } from "@schemas/user/User.schema";
import { Request, Response, Router } from "express";
import { z } from "zod";
import UserController from "../../../controllers/UserController";
import authMiddleware from "../../../middleware/authMiddleware";



export const UserPrivateRoute = Router();

UserPrivateRoute.delete("/", authMiddleware, async (req: Request, res: Response) => {
    await UserController.delete(req, res);
});
UserPrivateRoute.put("/:userId", authMiddleware, async (req: Request, res: Response) => {
    const userId = req.params.userId; //todo - change all this bullshit to res.locals.decoded. id or email.
    const validateBody = validateRequestBody(UpdateUserSchema, req);
    await UserController.update(userId, validateBody, res);
});
UserPrivateRoute.put("/password/:userId", authMiddleware, async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const validateBody = validateRequestBody(UpdateUserPasswordSchema, req);
    await UserController.updatePassword(userId, validateBody, res);
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
        if(errors.message == "Password with lenght 8 is required") {
            throw new InvalidPasswordError();
        }
        throw new Error(`Internal server error`);
    }
    return results.data;
}  
  