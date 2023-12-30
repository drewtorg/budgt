import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  UiCreateMonthComponent,
  UiMonthChangerComponent,
  UiPageComponent,
} from '@budgt/shared/components';
import { BudgetService } from '@budgt/shared/services';
import { MonthYearPipe } from '@budgt/shared/util';
import { AddExpenseFormComponent } from './add-expense-form/add-expense-form.component';
import { ExpenseTableComponent } from './expense-table/expense-table.component';

@Component({
  selector: 'budgt-app-expenses',
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MonthYearPipe,
    UiPageComponent,
    AddExpenseFormComponent,
    ExpenseTableComponent,
    UiMonthChangerComponent,
    UiCreateMonthComponent,
  ],
  templateUrl: './app-expenses.component.html',
  styleUrl: './app-expenses.component.css',
})
export class AppExpensesComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  budgetService = inject(BudgetService);
}
