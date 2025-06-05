import { Finance, FinanceType } from "./Finance";

export class Income implements Finance {
  amount: number;
  description: string;
  date: Date;
  type: FinanceType;

  constructor(
    amount: number,
    description: string,
    date: Date,
    type: FinanceType = FinanceType.INCOME
  ) {
    this.amount = amount;
    this.description = description;
    this.date = date;
    this.type = type;
  }
}
