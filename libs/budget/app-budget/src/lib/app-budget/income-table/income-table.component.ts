import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AmountPipe } from '@budgt/shared/components';
import { CategoryService } from '@budgt/shared/services';
import { Category, Variability } from '@budgt/shared/types';

@Component({
  selector: 'budgt-income-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    AmountPipe,
  ],
  templateUrl: './income-table.component.html',
  styleUrl: './income-table.component.css',
})
export class IncomeTableComponent implements OnChanges {
  @Input() income: Category[] | null = null;
  @ViewChild(MatSort) set sort(sort: MatSort | undefined) {
    if (sort) {
      this.dataSource.sort = sort;
    }
  }

  categoryService = inject(CategoryService);

  dataSource = new MatTableDataSource();
  amountPipe = new AmountPipe();
  Variability = Variability;

  displayedColumns = ['name', 'expectedAmount', 'actualAmount', 'variability'];

  ngOnChanges(changes: SimpleChanges) {
    const income = changes['income'].currentValue;
    if (income) {
      this.dataSource.data = income;
    }
  }

  onRemove(category: Category) {
    this.categoryService.removeCategory(category.id);
  }
}
