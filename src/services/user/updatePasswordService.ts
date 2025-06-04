import { InvalidPasswordError } from "@helpers/user-errors/invalidPasswordError";
import { User } from "../../entities/User";
import { UserRepository } from "../../repositories/UserRepository";
import EncryptPasswordService from "./encryptPassword";


export class UpdatePasswordService {
  constructor(private readonly userRepository: UserRepository) {
    this.encryptPasswordService = new EncryptPasswordService();
  }

  private readonly encryptPasswordService: EncryptPasswordService;

  async execute(user: User, userId: string, currentPassword: string, newPassword: string): Promise<User> {
    const isPasswordValid = await this.encryptPasswordService.comparePassword(currentPassword, user.password);
    if (!isPasswordValid) throw new InvalidPasswordError();

    user.password = await this.encryptPasswordService.encryptPassword(newPassword);
    await this.userRepository.updatePassword(userId, user.password);
    return user;
  }
}