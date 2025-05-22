import { User } from "../../entities/User";
import { UserRepository } from "../../repositories/UserRepository";
import EncryptPasswordService from "./encryptPassword";


export class RegisterService {
  constructor(private readonly userRepository: UserRepository) {
    this.encryptPasswordService = new EncryptPasswordService();
  }
  private readonly encryptPasswordService: EncryptPasswordService;
  async execute(user: User): Promise<User> {
    user.password = await this.encryptPasswordService.encryptPassword(
      user.password
    );
    const userCreated = await this.userRepository.create(user);
    return userCreated;
  }
}
