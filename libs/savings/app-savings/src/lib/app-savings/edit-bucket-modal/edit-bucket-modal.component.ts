import { AsyncPipe } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
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
import { BucketService, CategoryService } from '@budgt/shared/services';
import { Bucket } from '@budgt/shared/types';
import { sekMask } from '@budgt/shared/util';
import { InputMaskModule } from '@ngneat/input-mask';
@Component({
  selector: 'budgt-edit-bucket-modal',
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
  ],
  templateUrl: './edit-bucket-modal.component.html',
  styleUrl: './edit-bucket-modal.component.css',
})
export class EditBucketModalComponent {
  @ViewChild(MatSort) set sort(sort: MatSort | undefined) {
    if (sort) {
      this.dataSource.sort = sort;
    }
  }

  matDialogRef = inject(MatDialogRef<EditBucketModalComponent>);
  data: {
    bucket: Bucket;
    workspaceId: string;
  } = inject(MAT_DIALOG_DATA);
  fb = inject(NonNullableFormBuilder);
  categoryService = inject(CategoryService);
  bucketService = inject(BucketService);

  sekMask = sekMask;

  dataSource = new MatTableDataSource<Bucket>();

  bucket = this.data.bucket;
  bucketForm = this.fb.group({
    category: [this.bucket.category, Validators.required],
    amount: [this.bucket.amount, Validators.required],
  });

  displayedColumns = ['category', 'amount'];

  groupedCategories$ = this.categoryService.getGroupedExpenseCategories();

  onCancel() {
    this.matDialogRef.close();
  }

  onDelete() {
    this.bucketService.deleteBucket(this.bucket);
    this.matDialogRef.close();
  }

  onSave() {
    if (!this.bucketForm.valid) {
      return;
    }

    const bucket = this.bucketForm.value as Bucket;

    if (this.bucket.id) {
      this.bucketService.updateBucket(this.bucket.id, bucket);
    } else {
      this.bucketService.addBucket(bucket);
    }

    this.matDialogRef.close();
  }
}
