import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import {
  UiMonthChangerComponent,
  UiPageComponent,
} from '@budgt/shared/components';
import {
  BucketService,
  BudgetService,
  CategoryService,
  ExpenseService,
} from '@budgt/shared/services';
import { Category, CategoryType, Label, Totals } from '@budgt/shared/types';
import { MonthYearPipe } from '@budgt/shared/util';
import { Observable, combineLatest, map } from 'rxjs';
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
  );
  incomeTotals$ = this.incomeCategories$.pipe(this.mapTotals());
  totalIncome$ = this.incomeTotals$.pipe(map((totals) => totals.actual));
  expenseCategories$ = this.categories$.pipe(
    map((categories) =>
      categories.filter((c) => c.type === CategoryType.Expense),
    ),
  );
  needsExpenses$ = this.expenseCategories$.pipe(
    map((categories) => categories.filter((c) => c.label === Label.Need)),
  );
  needsTotals$ = this.needsExpenses$.pipe(this.mapTotals());
  wantsExpenses$ = this.expenseCategories$.pipe(
    map((categories) => categories.filter((c) => c.label === Label.Want)),
  );
  wantsTotals$ = this.wantsExpenses$.pipe(this.mapTotals());
  dreamsExpenses$ = this.expenseCategories$.pipe(
    map((categories) => categories.filter((c) => c.label === Label.Dreams)),
  );
  dreamsTotals$ = this.dreamsExpenses$.pipe(this.mapTotals());

  allTotals$ = combineLatest(
    [
      this.incomeTotals$,
      this.needsTotals$,
      this.dreamsTotals$,
      this.wantsTotals$,
    ],
    (incomeTotals, needsTotals, dreamsTotals, wantsTotals) => [
      incomeTotals,
      needsTotals,
      dreamsTotals,
      wantsTotals,
    ],
  );

  mapTotals() {
    return function (source: Observable<Category[]>): Observable<Totals> {
      return new Observable((subscriber) => {
        source.subscribe({
          next(value) {
            const expected = value
              .map((c) => c.expectedAmount)
              .reduce((acc, cur) => acc + cur, 0);
            const actual = value
              .map((c) => c.actualAmount)
              .reduce((acc, cur) => acc + cur, 0);
            subscriber.next({
              actual,
              expected,
              label: value?.[0].label,
              type: value?.[0].type,
            });
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
      data: {
        type,
      },
      minWidth: '375px',
    });
  }
}
