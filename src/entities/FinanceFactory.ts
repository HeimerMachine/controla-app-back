import { CategoryType, Finance, FinanceType } from "./Finance";

export class FinanceFactory {
  static createFinance(
    amount: number,
    description: string,
    date: Date,
    type: FinanceType,
    category?: CategoryType
  ): Finance {
    return {
      amount,
      description,
      date,
      type,
      category: category || undefined,
    };
  }
}