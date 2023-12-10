import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
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
import { CategoryService } from '@budgt/shared/services';
import { Category, CategoryType, Variability } from '@budgt/shared/types';
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

  categoryForm = this.fb.group({
    actualAmount: [this.category.actualAmount.toString()],
    expectedAmount: [this.category.expectedAmount.toString()],
    label: [this.category.label],
    name: [this.category.name],
    type: [this.category.type],
    variability: [this.category.variability],
  });

  onCancel() {
    this.matDialogRef.close();
  }

  onSave() {
    this.categoryService.updateCategory(this.category.id, {
      ...this.categoryForm.value,
      actualAmount: parseFloat(this.categoryForm.controls.actualAmount.value),
      expectedAmount: parseFloat(
        this.categoryForm.controls.expectedAmount.value,
      ),
    } as Category);
  }
}
