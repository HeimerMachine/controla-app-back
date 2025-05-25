import { PrismaClient } from "@prisma/client";
import prisma from "../lib/prisma.js";
import { User } from "../entities/User.js";
import { user as UserModel } from "@prisma/client";
import { UserNotFoundError } from "@helpers/user-errors/userNotFoundError.js";
import { UserAlreadyExistsError } from "@helpers/user-errors/userAlreadyExistsError.js";

export class UserRepository {
    private readonly prisma: PrismaClient;
    constructor() {
        this.prisma = prisma;
    }

    private async parseEntityToModel(user: User): Promise<Omit<UserModel, "id" | "createdAt">> {
        return {
            name: user.name,
            email: user.email,
            password: user.password
        };
    }

    private async parseModelToEntity(user: UserModel): Promise<User> {
        return new User(user.name, user.email, user.password, user.createdAt);
    }

    async create(user: User): Promise<User> {
        const userToCreate = await this.parseEntityToModel(user);
        const userModelExist = await this.prisma.user.findUnique({ where: { email: userToCreate.email } });
        if(!userModelExist) {
        const userModel = await this.prisma.user.create({ data: userToCreate });
        return this.parseModelToEntity(userModel);
        }
        throw new UserAlreadyExistsError();
    }

    async findByEmail(email: string): Promise<User> {
        const userModel = await this.prisma.user.findUnique({ where: { email } });
        if(!userModel) throw new UserNotFoundError();
        return this.parseModelToEntity(userModel);
    }

    async delete(userId: string): Promise<User> {
        const userModelExists = await this.prisma.user.findUnique({ where: { id: userId }});
        if(!userModelExists) throw new UserNotFoundError()
        const userModel = await this.prisma.user.delete({ where: { id: userId }});
        return this.parseModelToEntity(userModel);
    }
}
