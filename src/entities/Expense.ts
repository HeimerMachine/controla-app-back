import { Finance, FinanceType } from "./Finance";

export class Expense implements Finance {
  amount: number;
  description: string;
  date: Date;
  type: FinanceType;

  constructor(
    amount: number,
    description: string,
    date: Date,
    type: FinanceType = FinanceType.EXPENSE
  ) {
    this.amount = amount;
    this.description = description;
    this.date = date;
    this.type = type;
  }
}
