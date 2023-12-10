export interface Category {
  id: string;
  actualAmount: number;
  expectedAmount: number;
  label: Label;
  name: string;
  type: CategoryType;
  variability: Variability;
}

export interface CategoryData {
  id?: string;
  actualAmount: number;
  expectedAmount: number;
  label: string;
  name: string;
  type: string;
  variability: string;
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
