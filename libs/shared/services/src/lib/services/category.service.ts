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
import { Category } from '@budgt/shared/types';
import { Observable, switchMap } from 'rxjs';
import { BudgetService } from './budget.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private firestore = inject(Firestore);
  private snackbar = inject(MatSnackBar);
  private budgetService = inject(BudgetService);

  getCategories(): Observable<Category[]> {
    const categories = query(
      collection(
        this.firestore,
        'budget',
        this.budgetService.currentBudget().id,
        'categories',
      ),
    );
    return this.budgetService.loadBudget$.pipe(
      switchMap(
        () =>
          collectionData(categories, {
            idField: 'id',
          }) as Observable<Category[]>,
      ),
    );
  }

  getExpenseCategories(): Observable<Category[]> {
    const categories = query(
      collection(
        this.firestore,
        'budget',
        this.budgetService.currentBudget().id,
        'categories',
      ),
      where('type', '==', 'expense'),
    );
    return this.budgetService.loadBudget$.pipe(
      switchMap(
        () =>
          collectionData(categories, {
            idField: 'id',
          }) as Observable<Category[]>,
      ),
    );
  }

  addCategory(category: Category) {
    addDoc(
      collection(
        this.firestore,
        'budget',
        this.budgetService.currentBudget().id,
        'categories',
      ),
      category,
    );

    this.snackbar.open('Added category: ' + category.name, 'Dismiss', {
      duration: 3000,
    });
  }

  updateCategory(id: string, category: Category) {
    setDoc(
      doc(
        this.firestore,
        'budget',
        this.budgetService.currentBudget().id,
        'categories',
        id,
      ),
      category,
    );

    this.snackbar.open('Updated category: ' + category.name, 'Dismiss', {
      duration: 3000,
    });
  }

  removeCategory(category: Category) {
    deleteDoc(
      doc(
        this.firestore,
        'budget',
        this.budgetService.currentBudget().id,
        'categories',
        category.id,
      ),
    );

    this.snackbar.open('Removed category: ' + category.name, 'Dismiss', {
      duration: 3000,
    });
  }
}
