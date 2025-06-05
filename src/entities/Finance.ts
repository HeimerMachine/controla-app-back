export interface Finance {
  amount: number;
  description: string;
  date: Date;
  type: FinanceType;
  category?: CategoryType;
}

export enum FinanceType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

// Only for expenses
export enum CategoryType {
  ALIMENTACAO = 'ALIMENTACAO',
  SAUDE = 'SAUDE',
  LAZER = 'LAZER',
  ROUPAS_E_ACESSORIOS = 'ROUPAS E ACESSORIOS',
  DIVIDAS = 'DIVIDAS',
  CONTAS = 'CONTAS',
  OUTROS_TIPOS_DE_GASTOS = 'OUTROS TIPOS DE GASTOS'
}