import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Expense } from '@budgt/shared/types';
import { AmountPipe } from '@budgt/shared/util';
import { Observable, of, switchMap } from 'rxjs';
import { BudgetService } from './budget.service';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private firestore = inject(Firestore);
  private snackbar = inject(MatSnackBar);
  private budgetService = inject(BudgetService);

  amountPipe = new AmountPipe();
  snackbarConfig: MatSnackBarConfig = {
    duration: 3000,
    verticalPosition: 'top',
  };

  getExpenses(): Observable<Expense[]> {
    return this.budgetService.loadBudget$.pipe(
      switchMap(() => {
        const budgetId = this.budgetService.currentBudget()?.id;
        if (!budgetId) {
          return of([]);
        }

        const expenses = query(
          collection(this.firestore, 'budget', budgetId, 'expenses'),
        );
        return collectionData(expenses, {
          idField: 'id',
        }) as Observable<Expense[]>;
      }),
    );
  }

  getExpensesByCategory(category: string): Observable<Expense[]> {
    return this.budgetService.loadBudget$.pipe(
      switchMap(() => {
        const budgetId = this.budgetService.currentBudget()?.id;
        if (!budgetId) {
          return of([]);
        }

        const expenses = query(
          collection(this.firestore, 'budget', budgetId, 'expenses'),
          where('category', '==', category),
        );
        return collectionData(expenses, {
          idField: 'id',
        }) as Observable<Expense[]>;
      }),
    );
  }

  addExpense(expense: Expense) {
    const budgetId = this.budgetService.currentBudget()?.id;
    if (!budgetId) {
      return;
    }

    addDoc(collection(this.firestore, 'budget', budgetId, 'expenses'), {
      ...expense,
    });

    this.snackbar.open(
      'Added expense for ' + this.amountPipe.transform(expense.amount),
      'Dismiss',
      this.snackbarConfig,
    );
  }

  updateExpense(id: string, expense: Expense) {
    const budgetId = this.budgetService.currentBudget()?.id;
    if (!budgetId) {
      return;
    }

    setDoc(doc(this.firestore, 'budget', budgetId, 'expenses', id), expense);

    this.snackbar.open(
      'Updated expense for: ' + this.amountPipe.transform(expense.amount),
      'Dismiss',
      this.snackbarConfig,
    );
  }

  removeExpense(expense: Expense) {
    const budgetId = this.budgetService.currentBudget()?.id;
    if (!budgetId) {
      return;
    }

    deleteDoc(doc(this.firestore, 'budget', budgetId, 'expenses', expense.id));

    this.snackbar.open(
      'Removed expense for ' + this.amountPipe.transform(expense.amount),
      'Dismiss',
      this.snackbarConfig,
    );
  }
}
