import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BudgetService, ExpenseService } from '@budgt/shared/services';
import { Expense } from '@budgt/shared/types';
import { AmountPipe, YearMonthDayPipe } from '@budgt/shared/util';
import { map, tap } from 'rxjs';
import { EditExpenseModalComponent } from '../edit-expense-modal/edit-expense-modal.component';

@Component({
  selector: 'budgt-expense-table',
  standalone: true,
  imports: [
    NgClass,
    AsyncPipe,
    DatePipe,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    AmountPipe,
  ],
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.css',
})
export class ExpenseTableComponent {
  @ViewChild(MatSort) set sort(sort: MatSort | undefined) {
    if (sort) {
      this.dataSource.sort = sort;
    }
  }

  expenseService = inject(ExpenseService);
  budgetService = inject(BudgetService);
  matDialog = inject(MatDialog);

  dataSource = new MatTableDataSource();
  yearMonthDayPipe = new YearMonthDayPipe();

  expenses$ = this.expenseService.getExpenses().pipe(
    tap(
      (data) =>
        (this.dataSource.data = data.map((d) => ({
          ...d,
          date: this.yearMonthDayPipe.transform(d.date),
        }))),
    ),
  );

  totalAmount$ = this.expenses$.pipe(
    map((e) => e.reduce((prev, curr) => prev + curr.amount, 0)),
  );

  displayedColumns = ['date', 'amount', 'category'];

  onRemove(expense: Expense) {
    this.expenseService.removeExpense(expense);
  }

  onRowClick(expense: Expense) {
    this.matDialog.open(EditExpenseModalComponent, {
      data: expense,
      minWidth: '375px',
    });
  }
}
