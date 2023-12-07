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
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private firestore = inject(Firestore);

  getExpenses(month: number, year: number): Observable<Expense[]> {
    const expenses = query(
      collection(this.firestore, 'budget', 'fhkEtoq6d1eNN8hfTkLg', 'expenses'),
      where('month', '==', month),
      where('year', '==', year),
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
  }

  removeExpense(id: string) {
    deleteDoc(
      doc(this.firestore, 'budget', 'fhkEtoq6d1eNN8hfTkLg', 'expenses', id),
    );
  }
}
