import prisma from "@lib/prisma";
import { PrismaClient } from "@prisma/client";

export class FinanceRepository {
  private readonly prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }
}
