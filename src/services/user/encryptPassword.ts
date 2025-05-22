import { PasswordNotMatchError } from "@helpers/user-errors/passwordNotMatchError";
import bcrypt from "bcrypt";

export default class EncryptPasswordService {
    encryptPassword(password: string): string {
      const saltRounds = 10;
      const hashedPassword = bcrypt.hashSync(password, saltRounds);
      return hashedPassword;
    }

    async comparePassword(password: string, passwordHashed: string): Promise<boolean> {
      if(!(await bcrypt.compare(password, passwordHashed))) throw new PasswordNotMatchError();
      return true;
    }
}
