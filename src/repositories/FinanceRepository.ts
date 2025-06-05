import { CategoryType, Finance, FinanceType } from "@entities/Finance";
import prisma from "@lib/prisma";
import { PrismaClient } from "@prisma/client";

export class FinanceRepository {
  private readonly prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  async create(userEmail: string, finance: Finance): Promise<Finance> {
    const user = await this.prisma.user.findFirst({
      where: { email: userEmail },
    }).catch(() => {
      throw new Error("User not found");
    });
    if (!user) {
      throw new Error("User not found");
    }
    const id = user.id;
    const category = finance.category ? finance.category.toUpperCase() as keyof typeof CategoryType : undefined;
    const financeCreated = await this.prisma.finance.create({
      data: {
        amount: finance.amount,
        description: finance.description,
        date: finance.date,
        type: finance.type,
        category: category,
        user: { connect: { id } },
      },
    });
    return {
      amount: financeCreated.amount,
      description: financeCreated.description,
      date: financeCreated.date,
      type: financeCreated.type as FinanceType,
      category: financeCreated.category as CategoryType
    };
  }

  async getAllByUser(userEmail: string): Promise<Finance[]> {
    const user = await this.prisma.user.findFirst({
      where: { email: userEmail },
      include: { finances: true },
    }).catch(() => {
      throw new Error("User not found");
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user.finances.map(finance => ({
      amount: finance.amount,
      description: finance.description,
      date: finance.date,
      type: finance.type as FinanceType,
      category: finance.category as CategoryType | undefined
    }));
  }

}
