import { Category } from './category';
import { Expense } from './expense';

export interface Budget {
  id: string;
  categories: Category[];
  expenses: Expense[];
  date: string;
}
