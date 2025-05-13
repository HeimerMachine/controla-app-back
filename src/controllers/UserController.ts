import { RegisterUserUseCase } from "../services/RegisterUserUseCase.js";
import { User } from "../entities/User.js";
import { Response } from "express";
import { UserRepository } from "../repositories/UserRepository.js";
import { StatusCodes } from "http-status-codes";
import { RegiserUserSchema } from "../schemas/User.schema.js";
import { z } from "zod";

function initializeUseCases() {
    const userRepository = new UserRepository();
    const registerUserUseCase = new RegisterUserUseCase(userRepository);
    return {registerUserUseCase};
}

const { registerUserUseCase } = initializeUseCases();

const UserController = {
    register: async (body: z.infer<typeof RegiserUserSchema>, res: Response) => {
        const { name, email, password } = body
        const user = new User(name, email, password);
        const userCreated = await registerUserUseCase.execute(user);
        res.status(StatusCodes.CREATED).json({ message: "User created successfully", user: userCreated });
        //TODO: Add a logger, create jwt-token in this stage.
    },
}

export default UserController;
