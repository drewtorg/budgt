import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { UiPageComponent } from '@budgt/shared/components';
import { CategoryService, ExpenseService } from '@budgt/shared/services';
import { CategoryType } from '@budgt/shared/types';
import { map } from 'rxjs';
import { EditCategoryModalComponent } from './edit-category-modal/edit-category-modal.component';
import { IncomeTableComponent } from './income-table/income-table.component';

@Component({
  selector: 'budgt-app-budget',
  standalone: true,
  imports: [
    AsyncPipe,
    MatCardModule,
    MatButtonModule,
    UiPageComponent,
    IncomeTableComponent,
  ],
  templateUrl: './app-budget.component.html',
  styleUrl: './app-budget.component.css',
})
export class AppBudgetComponent {
  expenseService = inject(ExpenseService);
  categoryService = inject(CategoryService);
  dialog = inject(MatDialog);

  expenses$ = this.expenseService.getExpenses();
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

  onAdd() {
    this.dialog.open(EditCategoryModalComponent, {
      data: {
        type: CategoryType.Income,
      },
      minWidth: '375px',
    });
  }
}
