import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AmountPipe } from '@budgt/shared/components';
import { BucketService } from '@budgt/shared/services';
import { Bucket, Category, Variability } from '@budgt/shared/types';
import { EditBucketModalComponent } from '../edit-bucket-modal/edit-bucket-modal.component';

@Component({
  selector: 'budgt-bucket-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    AmountPipe,
  ],
  templateUrl: './bucket-table.component.html',
  styleUrl: './bucket-table.component.css',
})
export class BucketTableComponent implements OnChanges {
  @Input() buckets: Bucket[] | null = null;
  @ViewChild(MatSort) set sort(sort: MatSort | undefined) {
    if (sort) {
      this.dataSource.sort = sort;
    }
  }

  bucketService = inject(BucketService);
  dialog = inject(MatDialog);

  dataSource = new MatTableDataSource<Category>();
  amountPipe = new AmountPipe();
  Variability = Variability;

  displayedColumns = ['category', 'amount'];

  ngOnChanges(changes: SimpleChanges) {
    const buckets = changes['buckets'].currentValue;
    if (buckets) {
      this.dataSource.data = buckets;
    }
  }

  onRowClick(bucket: Bucket) {
    this.dialog.open(EditBucketModalComponent, {
      data: {
        workspaceId: 'REWRjQEfLbmLu2OJNCpi',
        bucket: { ...bucket },
      },
      minWidth: '375px',
    });
  }
}