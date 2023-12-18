import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { UiPageComponent } from '@budgt/shared/components';
import {
  BucketService,
  CategoryService,
  ExpenseService,
} from '@budgt/shared/services';
import { CategoryType, Label } from '@budgt/shared/types';
import { map } from 'rxjs';
import { BucketTableComponent } from './bucket-table/bucket-table.component';
import { CategoryTableComponent } from './category-table/category-table.component';
import { EditBucketModalComponent } from './edit-bucket-modal/edit-bucket-modal.component';
import { EditCategoryModalComponent } from './edit-category-modal/edit-category-modal.component';

@Component({
  selector: 'budgt-app-budget',
  standalone: true,
  imports: [
    AsyncPipe,
    MatCardModule,
    MatButtonModule,
    UiPageComponent,
    CategoryTableComponent,
    BucketTableComponent,
  ],
  templateUrl: './app-budget.component.html',
  styleUrl: './app-budget.component.css',
})
export class AppBudgetComponent {
  expenseService = inject(ExpenseService);
  bucketService = inject(BucketService);
  categoryService = inject(CategoryService);
  dialog = inject(MatDialog);

  CategoryType = CategoryType;

  expenses$ = this.expenseService.getExpenses();
  buckets$ = this.bucketService.getBuckets('REWRjQEfLbmLu2OJNCpi');
  categories$ = this.categoryService.getCategories();
  incomeCategories$ = this.categories$.pipe(
    map((categories) =>
      categories.filter((c) => c.type === CategoryType.Income),
    ),
  );
  expenseCategories$ = this.categories$.pipe(
    map((categories) =>
      categories.filter((c) => c.type === CategoryType.Expense),
    ),
  );
  needsExpenses$ = this.expenseCategories$.pipe(
    map((categories) => categories.filter((c) => c.label === Label.Need)),
  );
  wantsExpenses$ = this.expenseCategories$.pipe(
    map((categories) => categories.filter((c) => c.label === Label.Want)),
  );
  dreamsExpenses$ = this.expenseCategories$.pipe(
    map((categories) => categories.filter((c) => c.label === Label.Dreams)),
  );

  onAddCategory(type: CategoryType) {
    this.dialog.open(EditCategoryModalComponent, {
      data: {
        type,
      },
      minWidth: '375px',
    });
  }

  onAddBucket() {
    this.dialog.open(EditBucketModalComponent, {
      data: {
        workspaceId: 'REWRjQEfLbmLu2OJNCpi',
        bucket: {},
      },
      minWidth: '375px',
    });
  }
}
