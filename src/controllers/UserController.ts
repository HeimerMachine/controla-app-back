import { RegisterService } from "../services/user/registerService";
import { User } from "../entities/User";
import { Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { StatusCodes } from "http-status-codes";
import { LoginUserSchema, RegiserUserSchema } from "../schemas/User.schema";
import { z } from "zod";
import { LoginService } from "@services/user/loginService";


function initializeUseCases() {
    const userRepository = new UserRepository();
    const registerService = new RegisterService(userRepository);
    const loginService = new LoginService(userRepository);
    return {registerService, loginService};
}

const { registerService, loginService } = initializeUseCases();

const UserController = {
    register: async (body: z.infer<typeof RegiserUserSchema>, res: Response) => {
        const { name, email, password } = body
        const user = new User(name, email, password);
        const userCreated = await registerService.execute(user);
        res.status(StatusCodes.CREATED).json({ message: "User created successfully", user: userCreated });
        //TODO: Add a logger, create jwt-token in this stage.
    },
    login: async (body: z.infer<typeof LoginUserSchema>, res: Response) => {
        const { email, password } = body;
        const token = await loginService.execute({ email, password })
        res.status(StatusCodes.CREATED).json({message: "Login successful", token});
    },
}

export default UserController;
