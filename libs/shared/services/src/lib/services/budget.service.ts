import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Budget } from '@budgt/shared/types';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private firestore = inject(Firestore);

  async addBudget(budget: Budget) {
    return await addDoc(collection(this.firestore, 'budget'), budget);
  }
}
