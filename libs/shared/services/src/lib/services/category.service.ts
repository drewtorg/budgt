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
import {
  Category,
  CategoryGroup,
  Label,
  Variability,
} from '@budgt/shared/types';
import { Observable, map, switchMap } from 'rxjs';
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

  getGroupedExpenseCategories(): Observable<CategoryGroup[]> {
    return this.getExpenseCategories().pipe(
      map((c) =>
        c.reduce(
          (acc, cur) => {
            const group = acc[cur.label.toString()];
            if (!group) {
              acc[cur.label.toString()] = {
                label: cur.label[0].toLocaleUpperCase() + cur.label.slice(1),
                categories: [cur],
              };
            } else {
              group.categories.push(cur);
            }
            return acc;
          },
          {} as {
            [label: string]: CategoryGroup | undefined;
          },
        ),
      ),
      map(
        (groups) =>
          [
            groups[Label.Need],
            groups[Label.Want],
            groups[Label.Dreams],
          ] as CategoryGroup[],
      ),
      map((groups) =>
        groups.map((g) => {
          const categories = [...g.categories];
          categories.sort((a, b) => {
            if (a.variability !== b.variability) {
              return a.variability === Variability.Variable ? -1 : 1;
            }

            return b.expectedAmount - a.expectedAmount;
          });
          g.categories = categories;
          return g;
        }),
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
