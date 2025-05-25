import { InvalidParamsError } from "@helpers/user-errors/invalidParamsError";
import { DeleteUserSchema } from "@schemas/User.schema";
import { Request, Response, Router } from "express";
import { z } from "zod";
import UserController from "../../controllers/UserController";
import authMiddleware from "../../middleware/authMiddleware";


export const UserPrivateRoute = Router();

UserPrivateRoute.delete("/:userId", authMiddleware, async (req: Request, res: Response) => {
    const validateParams = validateRequestBody(DeleteUserSchema, req);
    await UserController.delete(validateParams.userId, res);
});



function validateRequestBody(schema: z.ZodSchema, req: Request) {
    const results = schema.safeParse(req.params);
    if (!results.success) {
        const errors = results.error.errors[0];
        if (errors.message == "UserId must be a valid UUID") {
            throw new InvalidParamsError();
        }
        throw new Error(`Internal server error`);
    }
    return results.data;
}  