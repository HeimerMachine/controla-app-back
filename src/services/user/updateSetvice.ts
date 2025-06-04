import { User } from "../../entities/User";
import { UserRepository } from "../../repositories/UserRepository";


export class UpdateService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string, userUpdate: Partial<User>): Promise<User> {
    const updatedUser = await this.userRepository.update(userId, userUpdate);
    return updatedUser;
  }
}