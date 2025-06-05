import { Finance, FinanceType } from "./Finance";

export class FinanceFactory {
  static createIncome(amount: number, description: string, date: Date): Finance {
    return {
      amount,
      description,
      date,
      type: FinanceType.INCOME
    };
  }

  static createExpense(amount: number, description: string, date: Date): Finance {
    return {
      amount,
      description,
      date,
      type: FinanceType.EXPENSE
    };
  }
}