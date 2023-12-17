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
import { AmountPipe } from '@budgt/shared/components';
import { Expense } from '@budgt/shared/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private firestore = inject(Firestore);
  private snackbar = inject(MatSnackBar);

  amountPipe = new AmountPipe();

  getExpenses(): Observable<Expense[]> {
    const expenses = query(
      collection(this.firestore, 'budget', 'fhkEtoq6d1eNN8hfTkLg', 'expenses'),
    );
    return collectionData(expenses, {
      idField: 'id',
    }) as Observable<Expense[]>;
  }

  getExpensesByCategory(category: string): Observable<Expense[]> {
    const expenses = query(
      collection(this.firestore, 'budget', 'fhkEtoq6d1eNN8hfTkLg', 'expenses'),
      where('category', '==', category),
    );
    return collectionData(expenses, {
      idField: 'id',
    }) as Observable<Expense[]>;
  }

  addExpense(expense: Expense) {
    addDoc(
      collection(this.firestore, 'budget', 'fhkEtoq6d1eNN8hfTkLg', 'expenses'),
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
      doc(this.firestore, 'budget', 'fhkEtoq6d1eNN8hfTkLg', 'expenses', id),
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
        'fhkEtoq6d1eNN8hfTkLg',
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
