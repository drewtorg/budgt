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
import { MatSnackBar } from '@angular/material/snack-bar';
import { Expense } from '@budgt/shared/types';
import { AmountPipe } from '@budgt/shared/util';
import { Observable, switchMap } from 'rxjs';
import { BudgetService } from './budget.service';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private firestore = inject(Firestore);
  private snackbar = inject(MatSnackBar);
  private budgetService = inject(BudgetService);

  amountPipe = new AmountPipe();

  getExpenses(): Observable<Expense[]> {
    const expenses = query(
      collection(
        this.firestore,
        'budget',
        this.budgetService.currentBudget().id,
        'expenses',
      ),
    );
    return this.budgetService.loadBudget$.pipe(
      switchMap(
        () =>
          collectionData(expenses, {
            idField: 'id',
          }) as Observable<Expense[]>,
      ),
    );
  }

  getExpensesByCategory(category: string): Observable<Expense[]> {
    const expenses = query(
      collection(
        this.firestore,
        'budget',
        this.budgetService.currentBudget().id,
        'expenses',
      ),
      where('category', '==', category),
    );
    return this.budgetService.loadBudget$.pipe(
      switchMap(
        () =>
          collectionData(expenses, {
            idField: 'id',
          }) as Observable<Expense[]>,
      ),
    );
  }

  addExpense(expense: Expense) {
    addDoc(
      collection(
        this.firestore,
        'budget',
        this.budgetService.currentBudget().id,
        'expenses',
      ),
      {
        ...expense,
      },
    );

    this.snackbar.open(
      'Added expense for ' + this.amountPipe.transform(expense.amount),
      'Dismiss',
      {
        duration: 3000,
      },
    );
  }

  updateExpense(id: string, expense: Expense) {
    setDoc(
      doc(
        this.firestore,
        'budget',
        this.budgetService.currentBudget().id,
        'expenses',
        id,
      ),
      expense,
    );

    this.snackbar.open(
      'Updated expense for: ' + this.amountPipe.transform(expense.amount),
      'Dismiss',
      {
        duration: 3000,
      },
    );
  }

  removeExpense(expense: Expense) {
    deleteDoc(
      doc(
        this.firestore,
        'budget',
        this.budgetService.currentBudget().id,
        'expenses',
        expense.id,
      ),
    );

    this.snackbar.open(
      'Removed expense for ' + this.amountPipe.transform(expense.amount),
      'Dismiss',
      {
        duration: 3000,
      },
    );
  }
}
