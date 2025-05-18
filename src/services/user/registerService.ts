import { User } from "../../entities/User";
import { UserRepository } from "../../repositories/UserRepository";
import EncryptPasswordService from "./encryptPassword";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UserAlreadyExistsError } from "@helpers/user-errors/userAlreadyExistsError";

export class RegisterService {
  constructor(private readonly userRepository: UserRepository) {
    this.encryptPasswordService = new EncryptPasswordService();
  }
  private readonly encryptPasswordService: EncryptPasswordService;
  async execute(user: User): Promise<User> {
    user.password = await this.encryptPasswordService.encryptPassword(
      user.password
    );
    try {
      const userCreated = await this.userRepository.create(user);
      return userCreated;
    } catch (error: PrismaClientKnownRequestError | unknown) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new UserAlreadyExistsError();
        }
      }
      throw new Error(`Internal server error`);
    }
  }
}
