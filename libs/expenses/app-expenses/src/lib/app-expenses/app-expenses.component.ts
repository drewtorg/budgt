import { Component, Input, ViewChild, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Observable, tap } from 'rxjs';
import {
  AmountPipe,
  MonthYearPipe,
  UiPageComponent,
  YearMonthDayPipe,
} from '@budgt/shared/components';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService, ExpenseService } from '@budgt/shared/services';
import { Expense } from '@budgt/shared/types';

@Component({
  selector: 'budgt-app-expenses',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTableModule,
    MatSortModule,
    CurrencyPipe,
    AmountPipe,
    MonthYearPipe,
    UiPageComponent,
  ],
  templateUrl: './app-expenses.component.html',
  styleUrl: './app-expenses.component.css',
})
export class AppExpensesComponent implements OnInit {
  @Input() month = 0;
  @Input() year = 0;

  @ViewChild(MatSort) set sort(sort: MatSort | undefined) {
    if (sort) {
      this.dataSource.sort = sort;
    }
  }

  router = inject(Router);
  route = inject(ActivatedRoute);
  fb = inject(NonNullableFormBuilder);
  expenseService = inject(ExpenseService);
  categoryService = inject(CategoryService);

  yearMonthDayPipe = new YearMonthDayPipe();

  expenses$!: Observable<Expense[]>;
  categories$ = this.categoryService.getCategories();

  displayedColumns = ['date', 'amount', 'category'];

  expenseForm = this.fb.group({
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    category: ['', Validators.required],
    date: [new Date(), Validators.required],
  });

  dataSource = new MatTableDataSource();

  get currentMonth() {
    return {
      year: this.year,
      month: this.month,
    };
  }

  ngOnInit() {
    this.loadPage();
  }

  loadPage() {
    this.month = this.month
      ? parseInt(this.month as unknown as string)
      : new Date().getMonth() + 1;
    this.year = this.year
      ? parseInt(this.year as unknown as string)
      : new Date().getFullYear();

    this.expenses$ = this.expenseService
      .getExpenses(this.month, this.year)
      .pipe(
        tap(
          (data) =>
            (this.dataSource.data = data.map((d) => ({
              ...d,
              date: this.yearMonthDayPipe.transform(d),
            }))),
        ),
      );
  }

  normalizeQueryParams() {
    this.month = this.month
      ? parseInt(this.month as unknown as string)
      : new Date().getMonth() + 1;
    this.year = this.year
      ? parseInt(this.year as unknown as string)
      : new Date().getFullYear();
  }

  onSubmit() {
    if (!this.expenseForm.valid) {
      return;
    }

    const dateSections =
      this.expenseForm.controls.date.value
        .toISOString()
        .split('T')[0]
        .split('-')
        .map((s) => parseInt(s)) ?? [];
    const expense = {
      amount: parseInt(this.expenseForm.controls.amount.value),
      category: this.expenseForm.controls.category.value,
      year: dateSections[0],
      month: dateSections[1],
      day: dateSections[2],
    } as Expense;

    this.expenseService.addExpense(expense);

    this.expenseForm.setValue({
      amount: '',
      category: '',
      date: new Date(),
    });
  }

  onRemove(id: string) {
    this.expenseService.removeExpense(id);
  }

  onChangeMonth(increment: boolean) {
    this.normalizeQueryParams();

    if (increment && this.month === 12) {
      this.month = 1;
      this.year++;
    } else if (!increment && this.month === 1) {
      this.month = 12;
      this.year--;
    } else {
      this.month += increment ? 1 : -1;
    }

    this.router.navigate(['expenses'], {
      queryParams: {
        month: this.month,
        year: this.year,
      },
    });

    this.loadPage();
  }
}
