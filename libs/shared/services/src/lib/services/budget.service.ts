import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  docData,
} from '@angular/fire/firestore';
import { Budget } from '@budgt/shared/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private firestore = inject(Firestore);
  // TODO: listen for route updates and handle setting current month and year
  //       set the current budget based on the month and year
  //       if budget doesn't exist on that date, create a budget based on the current months budget(?)

  getBudget(id: string): Observable<Budget> {
    return docData(doc(this.firestore, 'budget', id), {
      idField: 'id',
    }) as Observable<Budget>;
  }

  async addBudget(budget: Budget) {
    return await addDoc(collection(this.firestore, 'budget'), budget);
  }
}
