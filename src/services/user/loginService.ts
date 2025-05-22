import { UserRepository } from "../../repositories/UserRepository";
import EncryptPasswordService from "./encryptPassword";
import jwt from "jsonwebtoken";

export class LoginService {
  constructor(private readonly userRepository: UserRepository) {
      this.encryptPasswordService = new EncryptPasswordService();
  }
  private readonly encryptPasswordService: EncryptPasswordService;
  async execute(user: {email: string, password: string}): Promise<string> {
    const userExist = await this.userRepository.findByEmail(user.email);
    if(!(await this.encryptPasswordService.comparePassword(user.password, userExist.password))) {
      throw new Error();
    }
    const token = jwt.sign({ id: userExist.email }, process.env.JWT_SECRET as string, {
      expiresIn: "12h",
    });
    return token;
  }
}
