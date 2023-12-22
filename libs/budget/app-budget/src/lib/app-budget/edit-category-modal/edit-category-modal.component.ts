import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
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
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CategoryService, ExpenseService } from '@budgt/shared/services';
import {
  Category,
  CategoryType,
  Expense,
  Label,
  Variability,
} from '@budgt/shared/types';
import { AmountPipe, amountMask } from '@budgt/shared/util';
import { InputMaskModule } from '@ngneat/input-mask';
import { Observable, of, tap } from 'rxjs';
@Component({
  selector: 'budgt-edit-category-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatTableModule,
    MatSortModule,
    InputMaskModule,
    AsyncPipe,
    DatePipe,
    AmountPipe,
  ],
  templateUrl: './edit-category-modal.component.html',
  styleUrl: './edit-category-modal.component.css',
})
export class EditCategoryModalComponent implements OnInit {
  @ViewChild(MatSort) set sort(sort: MatSort | undefined) {
    if (sort) {
      this.dataSource.sort = sort;
    }
  }

  matDialogRef = inject(MatDialogRef<EditCategoryModalComponent>);
  category: Category = inject(MAT_DIALOG_DATA);
  fb = inject(NonNullableFormBuilder);
  categoryService = inject(CategoryService);
  expenseService = inject(ExpenseService);

  CategoryType = CategoryType;
  Variability = Variability;
  Label = Label;
  amountMask = amountMask;

  dataSource = new MatTableDataSource<Expense>();

  categoryForm = this.fb.group({
    actualAmount: [this.category.actualAmount, Validators.required],
    expectedAmount: [this.category.expectedAmount, Validators.required],
    label: [this.category.label, Validators.required],
    name: [this.category.name, Validators.required],
    type: [this.category.type, Validators.required],
    variability: [this.category.variability, Validators.required],
  });

  displayedColumns = ['date', 'amount'];

  expenses$: Observable<Expense[]> = of([]);

  get totalAmount() {
    return this.dataSource.data
      .map((e) => e.amount)
      .reduce((acc, cur) => acc + cur, 0);
  }

  ngOnInit() {
    if (this.category.type === CategoryType.Expense) {
      this.expenses$ = this.expenseService
        .getExpensesByCategory(this.category.name)
        .pipe(tap((expenses) => (this.dataSource.data = expenses)));
    }
  }

  onCancel() {
    this.matDialogRef.close();
  }

  onDelete() {
    this.categoryService.removeCategory(this.category);
    this.matDialogRef.close();
  }

  onSave() {
    if (!this.categoryForm.valid) {
      return;
    }

    const c = {
      ...this.categoryForm.value,
      actualAmount: this.categoryForm.controls.actualAmount.value,
      expectedAmount: this.categoryForm.controls.expectedAmount.value,
    } as Category;

    if (this.category.id) {
      this.categoryService.updateCategory(this.category.id, c);
    } else {
      this.categoryService.addCategory(c);
    }

    this.matDialogRef.close();
  }
}
