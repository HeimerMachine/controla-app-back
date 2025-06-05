import { RegisterService } from "../services/user/registerService";
import { User } from "../entities/User";
import { Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { StatusCodes } from "http-status-codes";
import {
  LoginUserSchema,
  RegiserUserSchema,
  UpdateUserSchema,
  UpdateUserPasswordSchema,
} from "../schemas/user/User.schema";
import { z } from "zod";
import { LoginService } from "@services/user/loginService";
import { DeleteService } from "@services/user/deleteService";
import { UpdateService } from "@services/user/updateService";
import { UpdatePasswordService } from "@services/user/updatePasswordService";

function initializeUseCases() {
  const userRepository = new UserRepository();
  const registerService = new RegisterService(userRepository);
  const loginService = new LoginService(userRepository);
  const updateService = new UpdateService(userRepository);
  const deleteService = new DeleteService(userRepository);
  const updatePasswordService = new UpdatePasswordService(userRepository);
  return {
    registerService,
    loginService,
    updateService,
    deleteService,
    updatePasswordService,
  };
}

const {
  registerService,
  loginService,
  updateService,
  deleteService,
  updatePasswordService,
} = initializeUseCases();

const UserController = {
  register: async (body: z.infer<typeof RegiserUserSchema>, res: Response) => {
    const { name, email, password } = body;
    const user = new User(name, email, password);
    const userCreated = await registerService.execute(user);
    res
      .status(StatusCodes.CREATED)
      .json({
        message: "User created successfully",
        user: {
          email: userCreated.email,
          name: userCreated.name,
          createdAt: userCreated.createdAt,
        },
      });
    //TODO: Add a logger, create jwt-token in this stage.
  },
  login: async (body: z.infer<typeof LoginUserSchema>, res: Response) => {
    const { email, password } = body;
    const token = await loginService.execute({ email, password });
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Login successful", token });
  },
  update: async (
    userId: string,
    body: Partial<z.infer<typeof UpdateUserSchema>>,
    res: Response
  ) => {
    const userUpdate = body;
    const updatedUser = await updateService.execute(userId, userUpdate);
    res.status(StatusCodes.OK).json({
      message: "User updated successfully",
      user: { email: updatedUser.email, name: updatedUser.name },
    });
  },
  updatePassword: async (
    userId: string,
    body: z.infer<typeof UpdateUserPasswordSchema>,
    res: Response
  ) => {
    const { currentPassword, newPassword } = body;
    const updatedUser = await updatePasswordService.execute(
      userId,
      currentPassword,
      newPassword
    );
    res.status(StatusCodes.OK).json({
      message: "User password updated successfully",
      user: { email: updatedUser.email, name: updatedUser.name },
    });
  },
  delete: async (userId: string, res: Response) => {
    const userDeleted = await deleteService.execute(userId);
    res
      .status(StatusCodes.OK)
      .json({
        message: "User deleted sucessfully",
        user: {
          email: userDeleted.email,
          name: userDeleted.name,
          createdAt: userDeleted.createdAt,
        },
      });
  },
};

export default UserController;
