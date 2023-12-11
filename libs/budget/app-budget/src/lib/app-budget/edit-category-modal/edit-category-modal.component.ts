import { Component, inject } from '@angular/core';
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
import { amountMask } from '@budgt/shared/components';
import { CategoryService } from '@budgt/shared/services';
import {
  Category,
  CategoryType,
  Label,
  Variability,
} from '@budgt/shared/types';
import { InputMaskModule } from '@ngneat/input-mask';
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
    InputMaskModule,
  ],
  templateUrl: './edit-category-modal.component.html',
  styleUrl: './edit-category-modal.component.css',
})
export class EditCategoryModalComponent {
  matDialogRef = inject(MatDialogRef<EditCategoryModalComponent>);
  category: Category = inject(MAT_DIALOG_DATA);
  fb = inject(NonNullableFormBuilder);
  categoryService = inject(CategoryService);

  CategoryType = CategoryType;
  Variability = Variability;
  Label = Label;
  amountMask = amountMask;

  categoryForm = this.fb.group({
    actualAmount: [this.category.actualAmount, Validators.required],
    expectedAmount: [this.category.expectedAmount, Validators.required],
    label: [this.category.label, Validators.required],
    name: [this.category.name, Validators.required],
    type: [this.category.type, Validators.required],
    variability: [this.category.variability, Validators.required],
  });

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
