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
import {
  AsyncPipe,
  CurrencyPipe,
  JsonPipe,
  NgFor,
  NgIf,
} from '@angular/common';
import { Observable, tap } from 'rxjs';
import { AmountPipe } from '@budgt/shared/components';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService, ExpenseService } from '@budgt/shared/services';
import { Expense } from '@budgt/shared/types';

@Component({
  selector: 'budgt-app-expenses',
  standalone: true,
  imports: [
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
    ReactiveFormsModule,
    AsyncPipe,
    NgFor,
    JsonPipe,
    CurrencyPipe,
    AmountPipe,
    RouterModule,
    NgIf,
  ],
  templateUrl: './app-expenses.component.html',
  styleUrl: './app-expenses.component.css',
})
export class AppExpensesComponent implements OnInit {
  @Input() month = '';
  @Input() year = '';

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

  expenses$!: Observable<Expense[]>;
  categories$ = this.categoryService.getCategories();

  displayedColumns = ['date', 'amount', 'category'];

  expenseForm = this.fb.group({
    amount: ['', Validators.required],
    category: ['', Validators.required],
    date: [new Date(), Validators.required],
  });

  dataSource = new MatTableDataSource();

  ngOnInit() {
    if (!this.month) {
      this.month = (new Date().getMonth() + 1).toString();
    }

    if (!this.year) {
      this.year = new Date().getFullYear().toString();
    }
    this.expenses$ = this.expenseService
      .getExpenses(this.month, this.year)
      .pipe(
        tap(
          (data) =>
            (this.dataSource.data = data.map((d) => ({
              ...d,
              date: [d.year, d.month, d.day].join('-'),
            }))),
        ),
      );
  }

  onSubmit() {
    if (!this.expenseForm.valid) {
      return;
    }

    const dateSections =
      this.expenseForm.controls.date.value
        .toISOString()
        .split('T')[0]
        .split('-') ?? [];
    const expense = {
      id: '',
      amount: this.expenseForm.controls.amount.value,
      category: this.expenseForm.controls.category.value,
      year: dateSections[0],
      month: dateSections[1],
      day: dateSections[2],
    };

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
}
