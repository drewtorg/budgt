import { AsyncPipe, DatePipe } from '@angular/common';
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
import { AmountPipe, amountMask } from '@budgt/shared/components';
import { BucketService, CategoryService } from '@budgt/shared/services';
import { Bucket } from '@budgt/shared/types';
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
    DatePipe,
    AmountPipe,
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

  amountMask = amountMask;

  dataSource = new MatTableDataSource<Bucket>();

  bucket = this.data.bucket;
  workspaceId = this.data.workspaceId;
  bucketForm = this.fb.group({
    category: [this.bucket.category, Validators.required],
    amount: [this.bucket.amount, Validators.required],
  });

  displayedColumns = ['category', 'amount'];

  categories$ = this.categoryService.getCategories();

  onCancel() {
    this.matDialogRef.close();
  }

  onDelete() {
    this.bucketService.deleteBucket(this.workspaceId, this.bucket);
    this.matDialogRef.close();
  }

  onSave() {
    if (!this.bucketForm.valid) {
      return;
    }

    const bucket = this.bucketForm.value as Bucket;

    if (this.bucket.id) {
      this.bucketService.updateBucket(this.workspaceId, this.bucket.id, bucket);
    } else {
      this.bucketService.addBucket(this.workspaceId, bucket);
    }

    this.matDialogRef.close();
  }
}
