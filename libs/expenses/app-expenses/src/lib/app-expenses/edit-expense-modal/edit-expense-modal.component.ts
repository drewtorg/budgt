import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { dateToString } from '@budgt/shared/functions';
import { CategoryService, ExpenseService } from '@budgt/shared/services';
import { Expense } from '@budgt/shared/types';
import { sekMask } from '@budgt/shared/util';
import { InputMaskModule } from '@ngneat/input-mask';

@Component({
  selector: 'budgt-edit-expense-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputMaskModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    AsyncPipe,
  ],
  templateUrl: './edit-expense-modal.component.html',
  styleUrl: './edit-expense-modal.component.css',
})
export class EditExpenseModalComponent {
  categoryService = inject(CategoryService);
  expenseService = inject(ExpenseService);
  matDialogRef = inject(MatDialogRef);
  fb = inject(NonNullableFormBuilder);

  sekMask = sekMask;
  expense: Expense = inject(MAT_DIALOG_DATA);
  expenseForm = this.fb.group({
    amount: [this.expense.amount, [Validators.required]],
    category: [this.expense.category, Validators.required],
    date: [new Date(this.expense.date), Validators.required],
  });

  groupedCategories$ = this.categoryService.getGroupedExpenseCategories();

  onCancel() {
    this.matDialogRef.close();
  }

  onDelete() {
    this.expenseService.removeExpense(this.expense);
    this.matDialogRef.close();
  }

  onSave() {
    if (!this.expenseForm.valid) {
      return;
    }

    const expense = {
      date: dateToString(this.expenseForm.controls.date.value),
      amount: this.expenseForm.controls.amount.value,
      category: this.expenseForm.controls.category.value,
    } as Expense;

    this.expenseService.updateExpense(this.expense.id, expense);
    this.matDialogRef.close();
  }
}
