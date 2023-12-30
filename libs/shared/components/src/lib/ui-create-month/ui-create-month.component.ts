import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  BudgetService,
  CategoryService,
  WorkspaceService,
} from '@budgt/shared/services';
import { Budget } from '@budgt/shared/types';
import { MonthYearPipe } from '@budgt/shared/util';
import { take, tap } from 'rxjs';

@Component({
  selector: 'budgt-ui-create-month',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MonthYearPipe,
  ],
  templateUrl: './ui-create-month.component.html',
  styleUrl: './ui-create-month.component.css',
})
export class UiCreateMonthComponent {
  budgetService = inject(BudgetService);
  categoryService = inject(CategoryService);
  workspaceService = inject(WorkspaceService);
  fb = inject(NonNullableFormBuilder);

  availableBudgets = Object.entries(
    this.workspaceService.currentWorkspace()?.budgets ?? {},
  )
    .map(([key, value]) => ({
      month: key,
      id: value,
    }))
    .sort((a, b) =>
      a.month.localeCompare(b.id, undefined, {
        numeric: true,
      }),
    );

  createBudgetForm = this.fb.group({
    budget: [this.availableBudgets[0]],
  });

  getMonthYear(date: string) {
    const [year, month] = date.split('-');
    return {
      month: parseInt(month),
      year: parseInt(year),
    };
  }

  onAddMonth() {
    const templateBudget = this.createBudgetForm.controls.budget.value;
    this.categoryService
      .getCategoriesByBudgetId(templateBudget.id)
      .pipe(
        take(1),
        tap(async (categories) => {
          categories.forEach((c) => (c.actualAmount = 0));
          const budget = {
            date: this.budgetService.currentBudgetDateString(),
          } as unknown as Budget;
          const addedBudget = await this.budgetService.addBudget(budget);
          addedBudget
            .pipe(
              take(1),
              tap(async (addedBudget) => {
                this.budgetService.currentBudget.set(addedBudget);
                await this.categoryService.addCategories(categories);
                const { year, month } = this.getMonthYear(addedBudget.date);
                this.workspaceService.addBudgetToWorkspace(
                  addedBudget.id,
                  [year, month].join('-'),
                );
                this.budgetService.changeBudgetMonth$.next();
              }),
            )
            .subscribe();
        }),
      )
      .subscribe();
  }
}
