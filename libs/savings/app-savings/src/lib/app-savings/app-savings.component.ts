import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { UiPageComponent } from '@budgt/shared/components';
import { BucketService } from '@budgt/shared/services';
import { BucketTableComponent } from './bucket-table/bucket-table.component';
import { EditBucketModalComponent } from './edit-bucket-modal/edit-bucket-modal.component';

@Component({
  selector: 'budgt-app-savings',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatCardModule,
    UiPageComponent,
    BucketTableComponent,
  ],
  templateUrl: './app-savings.component.html',
  styleUrl: './app-savings.component.css',
})
export class AppSavingsComponent {
  dialog = inject(MatDialog);

  bucketService = inject(BucketService);

  buckets$ = this.bucketService.getBuckets();

  onAddBucket() {
    this.dialog.open(EditBucketModalComponent, {
      data: {
        bucket: {},
      },
      minWidth: '375px',
    });
  }
}
