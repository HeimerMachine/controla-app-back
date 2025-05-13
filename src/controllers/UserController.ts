import { RegisterUserUseCase } from "../services/RegisterUserUseCase.js";
import { User } from "../entities/User.js";
import { Request, Response } from "express";

class UserController {
    constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}
    async register(req: Request, res: Response) {
        const { name, email, password } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }
        if (!email) {
            return res.status(400).json({ message: "Email is required" }); //this is ugly asfuck, but it's a quick fix
        }
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }
        const user = new User(name, email, password);
        const userCreated = await this.registerUserUseCase.execute(user);
        res.status(201).json(userCreated);
    }
}

export default UserController;
