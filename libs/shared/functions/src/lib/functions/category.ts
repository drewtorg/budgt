import { Category, Expense } from '@budgt/shared/types';

export function calculateActualAmount(
  category: Category,
  expenses: Expense[],
): number {
  if (category.actualAmount) {
    return category.actualAmount;
  } else {
    const matchingExpenses = expenses.filter(
      (e) => e.category === category.name,
    );
    return matchingExpenses
      .map((e) => e.amount)
      .reduce((acc, curr) => acc + curr, 0);
  }
}
