import { CategoryType, Finance, FinanceType } from "@entities/Finance";
import { FinanceFactory } from "@entities/FinanceFactory";
import { FinanceRepository } from "@repositories/FinanceRepository";

export class CreateFinanceService {
  constructor(private readonly financeRepository: FinanceRepository) {}

  async execute(
    userId: string,
    amount: number,
    description: string,
    date: Date,
    type: FinanceType,
    category?: CategoryType
  ): Promise<Finance> {
    const finance: Finance = FinanceFactory.createFinance(
      amount,
      description,
      date,
      type,
      category ? category.toUpperCase() as CategoryType : undefined
    );
    const financeCreated = await this.financeRepository.create(userId, finance);
    if (!financeCreated.category || financeCreated.category === undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { category, ...financeWithoutCategory } = financeCreated;
      return financeWithoutCategory as Omit<Finance, 'category'>;
    }
    return financeCreated;
  }
}