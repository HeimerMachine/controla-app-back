import { PrismaClient } from "@prisma/client";
import prisma from "../lib/prisma.js";
import { User } from "../entities/User.js";
import { user as UserModel } from "@prisma/client";

export class UserRepository {
    private readonly prisma: PrismaClient;
    constructor() {
        this.prisma = prisma;
    }

    async parseEntityToModel(user: User): Promise<Omit<UserModel, "id" | "createdAt">> {
        return {
            name: user.name,
            email: user.email,
            password: user.password
        };
    }

    async parseModelToEntity(user: UserModel): Promise<User> {
        return new User(user.name, user.email, user.password, user.createdAt);
    }

    async create(user: User): Promise<User> {
        const userToCreate = await this.parseEntityToModel(user);
        const userModel = await this.prisma.user.create({ data: userToCreate });
        return this.parseModelToEntity(userModel);
    }

    async findByEmail(email: string): Promise<User> {
        const userModel = await this.prisma.user.findUnique({ where: { email } });
        if (!userModel) {
            throw new Error("User not found"); //TODO: MIDDLEWARE ERROR HANDLER
        }
        return this.parseModelToEntity(userModel);
    }
}
