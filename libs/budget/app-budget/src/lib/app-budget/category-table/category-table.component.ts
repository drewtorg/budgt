import { NgClass, PercentPipe } from '@angular/common';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { calculateActualAmount } from '@budgt/shared/functions';
import { CategoryService } from '@budgt/shared/services';
import {
  Category,
  CategoryType,
  Expense,
  Label,
  Totals,
  Variability,
} from '@budgt/shared/types';
import { AmountPipe } from '@budgt/shared/util';
import { EditCategoryModalComponent } from '../edit-category-modal/edit-category-modal.component';

@Component({
  selector: 'budgt-category-table',
  standalone: true,
  imports: [
    NgClass,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    AmountPipe,
    PercentPipe,
  ],
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.css',
})
export class CategoryTableComponent implements OnChanges {
  @Input() categories: Category[] | null = null;
  @Input() type = CategoryType.Expense;
  @Input() label = Label.Want;
  @Input() totals: Totals | null = null;
  @Input() totalIncome: number | null = null;
  @Input() expenses: Expense[] | null = null;

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

  getActualAmount(category: Category): number {
    return calculateActualAmount(category, this.expenses || []);
  }

  ngOnChanges(changes: SimpleChanges) {
    const categories = changes['categories']?.currentValue;
    if (categories) {
      this.dataSource.data = [...categories];
    }
  }

  getActualAmountCellClass(actualAmount: number, expectedAmount: number) {
    const actualExceedsExpected = actualAmount > expectedAmount;
    if (this.type === CategoryType.Expense) {
      this.type;
      return {
        [this.label.toString()]: true,
        'exceeds-expected': actualExceedsExpected,
      };
    }

    if (this.type === CategoryType.Income) {
      return {
        income: true,
      };
    }

    return {};
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
