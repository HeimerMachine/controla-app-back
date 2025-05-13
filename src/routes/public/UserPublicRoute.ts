import { Router, Request, Response } from "express";
import UserController from "../../controllers/UserController.js";
import { RegisterUserUseCase } from "../../services/RegisterUserUseCase.js";
import { UserRepository } from "../../repositories/UserRepository.js";
import prisma from "../../lib/prisma.js";

export const UserPublicRoute = Router();
const userRepository = new UserRepository(prisma);
const registerUserUseCase = new RegisterUserUseCase(userRepository);
const userController = new UserController(registerUserUseCase);

UserPublicRoute.post("/register", async (req: Request, res: Response) => {
    await userController.register(req, res);
});
