import { Category } from './category';
import { Expense } from './expenses';

export interface Budget {
  id: string;
  categories: Category[];
  expenses: Expense[];
}
