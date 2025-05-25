import { User } from "../../entities/User";
import { UserRepository } from "../../repositories/UserRepository";


export class DeleteService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<User> {
    const deletedUser = await this.userRepository.delete(userId);
    return deletedUser;
  }
}