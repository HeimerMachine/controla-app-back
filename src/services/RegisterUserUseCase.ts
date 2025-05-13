import { User } from "../entities/User.js";
import { UserRepository } from "../repositories/UserRepository.js";

export class RegisterUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(user: User): Promise<User> {
        return this.userRepository.create(user);
    }
}
