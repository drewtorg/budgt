import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import {
  UiCreateMonthComponent,
  UiMonthChangerComponent,
  UiPageComponent,
} from '@budgt/shared/components';
import { calculateActualAmount } from '@budgt/shared/functions';
import {
  BucketService,
  BudgetService,
  CategoryService,
  ExpenseService,
} from '@budgt/shared/services';
import {
  Category,
  CategoryType,
  Expense,
  Label,
  Totals,
} from '@budgt/shared/types';
import { MonthYearPipe } from '@budgt/shared/util';
import { Observable, combineLatest, map, tap, withLatestFrom } from 'rxjs';
import { CategoryTableComponent } from './category-table/category-table.component';
import { EditCategoryModalComponent } from './edit-category-modal/edit-category-modal.component';
import { FinalResultsTableComponent } from './final-results-table/final-results-table.component';

@Component({
  selector: 'budgt-app-budget',
  standalone: true,
  imports: [
    AsyncPipe,
    MatCardModule,
    MatButtonModule,
    UiPageComponent,
    CategoryTableComponent,
    MonthYearPipe,
    UiMonthChangerComponent,
    UiCreateMonthComponent,
    FinalResultsTableComponent,
  ],
  templateUrl: './app-budget.component.html',
  styleUrl: './app-budget.component.css',
})
export class AppBudgetComponent {
  expenseService = inject(ExpenseService);
  bucketService = inject(BucketService);
  budgetService = inject(BudgetService);
  categoryService = inject(CategoryService);
  dialog = inject(MatDialog);

  CategoryType = CategoryType;
  Label = Label;

  expenses$ = this.expenseService.getExpenses();
  buckets$ = this.bucketService.getBuckets();
  categories$ = this.categoryService.getCategories();
  incomeCategories$ = this.categories$.pipe(
    map((categories) =>
      categories.filter((c) => c.type === CategoryType.Income),
    ),
    tap((c) => console.log(c)),
  );
  incomeTotals$ = this.incomeCategories$.pipe(
    withLatestFrom(this.expenses$),
    this.mapTotals(),
  );
  totalIncome$ = this.incomeTotals$.pipe(map((totals) => totals.actual));
  expenseCategories$ = this.categories$.pipe(
    map((categories) =>
      categories.filter((c) => c.type === CategoryType.Expense),
    ),
  );
  needsExpenses$ = this.expenseCategories$.pipe(
    map((categories) => categories.filter((c) => c.label === Label.Needs)),
  );
  needsTotals$ = this.needsExpenses$.pipe(
    withLatestFrom(this.expenses$),
    this.mapTotals(),
  );
  wantsExpenses$ = this.expenseCategories$.pipe(
    map((categories) => categories.filter((c) => c.label === Label.Wants)),
  );
  wantsTotals$ = this.wantsExpenses$.pipe(
    withLatestFrom(this.expenses$),
    this.mapTotals(),
  );
  dreamsExpenses$ = this.expenseCategories$.pipe(
    map((categories) => categories.filter((c) => c.label === Label.Dreams)),
  );
  dreamsTotals$ = this.dreamsExpenses$.pipe(
    withLatestFrom(this.expenses$),
    this.mapTotals(),
  );
  unaccountedTotals$ = combineLatest(
    [
      this.incomeTotals$,
      this.needsTotals$,
      this.dreamsTotals$,
      this.wantsTotals$,
    ],
    (incomeTotals, needsTotals, dreamsTotals, wantsTotals): Totals => {
      const actual =
        incomeTotals.actual -
        (needsTotals.actual + dreamsTotals.actual + wantsTotals.actual);

      return {
        type: CategoryType.Income,
        label: 'Unaccounted',
        actual,
        expected: 0,
      };
    },
  );

  allTotals$ = combineLatest(
    [
      this.incomeTotals$,
      this.needsTotals$,
      this.dreamsTotals$,
      this.wantsTotals$,
      this.unaccountedTotals$,
    ],
    (
      incomeTotals,
      needsTotals,
      dreamsTotals,
      wantsTotals,
      unaccountedTotals,
    ) => [
      incomeTotals,
      needsTotals,
      dreamsTotals,
      wantsTotals,
      unaccountedTotals,
    ],
  );

  mapTotals() {
    return function (
      source: Observable<[Category[], Expense[]]>,
    ): Observable<Totals> {
      return new Observable((subscriber) => {
        source.subscribe({
          next([categories, expenses]) {
            const expected = categories
              .map((c) => c.expectedAmount)
              .reduce((acc, cur) => acc + cur, 0);
            const actual = categories
              .map((c) => calculateActualAmount(c, expenses))
              .reduce((acc, cur) => acc + cur, 0);
            const category = categories?.[0];
            if (category) {
              subscriber.next({
                actual,
                expected,
                label:
                  category.type === CategoryType.Income
                    ? 'Income'
                    : category.label,
                type: category.type,
              });
            }
          },
          error(error) {
            subscriber.error(error);
          },
          complete() {
            subscriber.complete();
          },
        });
      });
    };
  }

  onAddCategory(type: CategoryType) {
    this.dialog.open(EditCategoryModalComponent, {
      data: { type },
      minWidth: '375px',
    });
  }
}
