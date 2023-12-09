import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AmountPipe, YearMonthDayPipe } from '@budgt/shared/components';
import { ExpenseService } from '@budgt/shared/services';
import { Expense } from '@budgt/shared/types';
import { map, take, tap } from 'rxjs';

@Component({
  selector: 'budgt-expense-table',
  standalone: true,
  imports: [
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
  snackbar = inject(MatSnackBar);

  dataSource = new MatTableDataSource();
  yearMonthDayPipe = new YearMonthDayPipe();
  amountPipe = new AmountPipe();

  expenses$ = this.expenseService.getExpenses().pipe(
    tap(
      (data) =>
        (this.dataSource.data = data.map((d) => ({
          ...d,
          date: this.yearMonthDayPipe.transform(d.date),
        }))),
    ),
  );

  displayedColumns = ['date', 'amount', 'category'];

  onRemove(id: string) {
    this.expenses$
      .pipe(
        take(1),
        map((expenses) => expenses.find((e) => e.id === id) as Expense),
        tap((expense) => {
          this.expenseService.removeExpense(id);

          this.snackbar.open(
            'Removed expense for ' + this.amountPipe.transform(expense.amount),
            'Dismiss',
            {
              duration: 3000,
            },
          );
        }),
      )
      .subscribe();
  }
}
