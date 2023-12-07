import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  query,
  where,
} from '@angular/fire/firestore';
import { Expense } from '@budgt/shared/types';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private firestore = inject(Firestore);

  getExpenses(month: string, year: string): Observable<Expense[]> {
    const expenses = query(
      collection(this.firestore, 'budget', 'fhkEtoq6d1eNN8hfTkLg', 'expenses'),
      where('month', '==', month),
      where('year', '==', year),
    );
    return collectionData(expenses, {
      idField: 'id',
    }).pipe(map((expenses) => expenses.map((e) => e as Expense)));
  }

  addExpense(expense: Expense) {
    addDoc(
      collection(this.firestore, 'budget', 'fhkEtoq6d1eNN8hfTkLg', 'expenses'),
      {
        ...expense,
        id: undefined,
      },
    );
  }

  removeExpense(id: string) {
    deleteDoc(
      doc(this.firestore, 'budget', 'fhkEtoq6d1eNN8hfTkLg', 'expenses', id),
    );
  }
}
