import { UserRepository } from "../../repositories/UserRepository";
import EncryptPasswordService from "./encryptPassword";
import jwt from "jsonwebtoken";
import { UserNotFoundError } from "@helpers/user-errors/userNotFoundError";
import { InvalidPasswordError } from "@helpers/user-errors/invalidPasswordError";

export class LoginService {
  constructor(private readonly userRepository: UserRepository) {
      this.encryptPasswordService = new EncryptPasswordService();
  }
  private readonly encryptPasswordService: EncryptPasswordService;
  async execute(user: {email: string, password: string}): Promise<string> {
    const userExist = await this.userRepository.findByEmail(user.email);
    if (!userExist) {
      throw new UserNotFoundError();
    }
    if(!(await this.encryptPasswordService.comparePassword(user.password, userExist.password))){
      throw new InvalidPasswordError();
    }
    const token = jwt.sign({ id: userExist.email }, process.env.JWT_SECRET as string, {
      expiresIn: "12h",
    });
    return token;
  }
}
