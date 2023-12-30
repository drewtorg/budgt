import { NgClass, PercentPipe } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { capitalize } from '@budgt/shared/functions';
import { CategoryService } from '@budgt/shared/services';
import { CategoryType, Totals, Variability } from '@budgt/shared/types';
import { AmountPipe } from '@budgt/shared/util';

@Component({
  selector: 'budgt-final-results-table',
  standalone: true,
  imports: [
    NgClass,
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    AmountPipe,
    PercentPipe,
  ],
  templateUrl: './final-results-table.component.html',
  styleUrl: './final-results-table.component.css',
})
export class FinalResultsTableComponent implements OnChanges {
  @Input() totals: Totals[] | null = null;

  categoryService = inject(CategoryService);
  dialog = inject(MatDialog);

  dataSource = new MatTableDataSource<Totals>();
  amountPipe = new AmountPipe();
  Variability = Variability;

  displayedColumns = ['name', 'actual', 'percent'];

  get totalIncome() {
    if (!this.totals) {
      return 0;
    }

    const income = this.totals.find((t) => t.type === CategoryType.Income);
    return income?.actual ?? 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    const totals = changes['totals']?.currentValue;
    if (totals) {
      this.dataSource.data = [...totals];
    }
  }

  getName(totals: Totals) {
    if (totals.type === CategoryType.Income) {
      return 'Income';
    }

    return capitalize(totals?.label);
  }

  getActualAmountCellClass(totals: Totals) {
    if (totals.type === CategoryType.Income) {
      return {
        income: true,
      };
    }

    return {
      [totals.label.toString()]: true,
    };
  }
}
