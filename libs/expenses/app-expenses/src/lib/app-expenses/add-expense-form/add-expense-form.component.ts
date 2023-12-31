import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { dateToString } from '@budgt/shared/functions';
import { CategoryService, ExpenseService } from '@budgt/shared/services';
import { Expense } from '@budgt/shared/types';
import { AmountPipe, sekMask } from '@budgt/shared/util';
import { InputMaskModule } from '@ngneat/input-mask';

@Component({
  selector: 'budgt-add-expense-form',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    InputMaskModule,
  ],
  templateUrl: './add-expense-form.component.html',
  styleUrl: './add-expense-form.component.css',
})
export class AddExpenseFormComponent {
  fb = inject(NonNullableFormBuilder);
  expenseService = inject(ExpenseService);
  categoryService = inject(CategoryService);

  groupedCategories$ = this.categoryService.getGroupedExpenseCategories();

  expenseForm = this.fb.group({
    amount: ['' as unknown as number, [Validators.required]],
    category: ['', Validators.required],
    date: [new Date(), Validators.required],
  });
  sekMask = sekMask;
  amountPipe = new AmountPipe();

  onSubmit() {
    if (!this.expenseForm.valid) {
      return;
    }

    const expense = {
      date: dateToString(this.expenseForm.controls.date.value),
      amount: this.expenseForm.controls.amount.value,
      category: this.expenseForm.controls.category.value,
    } as Expense;

    this.expenseService.addExpense(expense);

    this.expenseForm.reset({
      amount: '' as unknown as number,
      category: '',
      date: new Date(),
    });
  }
}
