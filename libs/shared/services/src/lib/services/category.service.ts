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
  writeBatch,
} from '@angular/fire/firestore';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { capitalize } from '@budgt/shared/functions';
import {
  Category,
  CategoryGroup,
  Label,
  Variability,
} from '@budgt/shared/types';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { BudgetService } from './budget.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private firestore = inject(Firestore);
  private snackbar = inject(MatSnackBar);
  private budgetService = inject(BudgetService);

  snackbarConfig: MatSnackBarConfig = {
    duration: 3000,
    verticalPosition: 'top',
  };

  getCategories(): Observable<Category[]> {
    return this.budgetService.loadBudget$.pipe(
      switchMap(() => {
        const budgetId = this.budgetService.currentBudget()?.id;
        if (!budgetId) {
          return of([]);
        }
        const categories = query(
          collection(this.firestore, 'budget', budgetId, 'categories'),
        );
        return (
          collectionData(categories, {
            idField: 'id',
          }) as Observable<Category[]>
        ).pipe(
          tap((categories) => console.log(categories)),
          map((categories) => categories || []),
        );
      }),
    );
  }

  getCategoriesByBudgetId(id: string): Observable<Category[]> {
    const categories = query(
      collection(this.firestore, 'budget', id, 'categories'),
    );
    return collectionData(categories, {
      idField: 'id',
    }) as Observable<Category[]>;
  }

  getExpenseCategories(): Observable<Category[]> {
    return this.budgetService.loadBudget$.pipe(
      switchMap(() => {
        const budgetId = this.budgetService.currentBudget()?.id;
        if (!budgetId) {
          return of([]);
        }
        const categories = query(
          collection(this.firestore, 'budget', budgetId, 'categories'),
          where('type', '==', 'expense'),
        );
        return collectionData(categories, {
          idField: 'id',
        }) as Observable<Category[]>;
      }),
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
                label: capitalize(cur.label),
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
            groups[Label.Needs],
            groups[Label.Wants],
            groups[Label.Dreams],
          ] as CategoryGroup[],
      ),
      map((groups) =>
        groups.map((g) => {
          console.log(g.categories);
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
    const budgetId = this.budgetService.currentBudget()?.id;
    if (!budgetId) {
      return;
    }

    addDoc(
      collection(this.firestore, 'budget', budgetId, 'categories'),
      category,
    );

    this.snackbar.open(
      'Added category: ' + category.name,
      'Dismiss',
      this.snackbarConfig,
    );
  }

  addCategories(categories: Category[]) {
    const budgetId = this.budgetService.currentBudget()?.id;
    if (!budgetId) {
      return;
    }

    const batch = writeBatch(this.firestore);
    categories.forEach((c) => {
      const ref = doc(
        collection(this.firestore, 'budget', budgetId, 'categories'),
      );
      batch.set(ref, c);
    });
    batch.commit();
  }

  updateCategory(id: string, category: Category) {
    const budgetId = this.budgetService.currentBudget()?.id;
    if (!budgetId) {
      return;
    }

    setDoc(doc(this.firestore, 'budget', budgetId, 'categories', id), category);

    this.snackbar.open(
      'Updated category: ' + category.name,
      'Dismiss',
      this.snackbarConfig,
    );
  }

  removeCategory(category: Category) {
    const budgetId = this.budgetService.currentBudget()?.id;
    if (!budgetId) {
      return;
    }

    deleteDoc(
      doc(this.firestore, 'budget', budgetId, 'categories', category.id),
    );

    this.snackbar.open(
      'Removed category: ' + category.name,
      'Dismiss',
      this.snackbarConfig,
    );
  }
}
