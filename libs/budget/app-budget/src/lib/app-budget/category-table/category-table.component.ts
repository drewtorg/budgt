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
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CategoryService } from '@budgt/shared/services';
import { Category, Variability } from '@budgt/shared/types';
import { AmountPipe } from '@budgt/shared/util';
import { EditCategoryModalComponent } from '../edit-category-modal/edit-category-modal.component';

@Component({
  selector: 'budgt-category-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    AmountPipe,
  ],
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.css',
})
export class CategoryTableComponent implements OnChanges {
  @Input() categories: Category[] | null = null;
  @ViewChild(MatSort) set sort(sort: MatSort | undefined) {
    if (sort) {
      this.dataSource.sort = sort;
    }
  }

  categoryService = inject(CategoryService);
  dialog = inject(MatDialog);

  dataSource = new MatTableDataSource<Category>();
  amountPipe = new AmountPipe();
  Variability = Variability;

  displayedColumns = ['name', 'expectedAmount', 'actualAmount'];

  get totalExpected() {
    return this.dataSource.data
      .map((c) => c.expectedAmount)
      .reduce((acc, cur) => acc + cur, 0);
  }

  get totalActual() {
    return this.dataSource.data
      .map((c) => c.actualAmount)
      .reduce((acc, cur) => acc + cur, 0);
  }

  ngOnChanges(changes: SimpleChanges) {
    const categories = changes['categories'].currentValue;
    if (categories) {
      this.dataSource.data = categories;
    }
  }

  onRowClick(category: Category) {
    this.dialog.open(EditCategoryModalComponent, {
      data: {
        ...category,
      },
      minWidth: '375px',
    });
  }
}
