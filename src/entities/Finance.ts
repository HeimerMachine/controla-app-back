export interface Finance {
  id?: string;
  userId?: string;
  amount: number;
  description: string;
  date: Date;
  type: FinanceType;
}

export enum FinanceType {
  INCOME = "income",
  EXPENSE = "expense",
}
