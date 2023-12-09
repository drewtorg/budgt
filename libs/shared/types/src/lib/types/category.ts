export interface Category {
  id: string;
  actualAmount: number;
  expectedAmount: number;
  label: Label;
  name: string;
  type: CategoryType;
  variability: Variability;
}

export enum Label {
  Need = 'need',
  Want = 'want',
  Dreams = 'dreams',
}

export enum CategoryType {
  Expense = 'expense',
  Income = 'income',
}

export enum Variability {
  Fixed = 'fixed',
  Variable = 'variable',
}
