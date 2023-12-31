import { NgClass } from '@angular/common';
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
import { AccountService, WorkspaceService } from '@budgt/shared/services';
import {
  Account,
  AccountType,
  Company,
  Currency,
  Variability,
} from '@budgt/shared/types';
import { AmountPipe } from '@budgt/shared/util';
import { EditAccountModalComponent } from '../edit-account-modal/edit-account-modal.component';

@Component({
  selector: 'budgt-account-table',
  standalone: true,
  imports: [
    NgClass,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    AmountPipe,
  ],
  templateUrl: './account-table.component.html',
  styleUrl: './account-table.component.css',
})
export class AccountTableComponent implements OnChanges {
  @Input() accounts: Account[] | null = null;
  @ViewChild(MatSort) set sort(sort: MatSort | undefined) {
    if (sort) {
      this.dataSource.sort = sort;
    }
  }

  accountService = inject(AccountService);
  workspaceService = inject(WorkspaceService);
  dialog = inject(MatDialog);

  dataSource = new MatTableDataSource<Account>();
  amountPipe = new AmountPipe();
  Variability = Variability;
  Company = Company;
  AccountType = AccountType;
  Currency = Currency;

  displayedColumns = ['company', 'type', 'name', 'amount'];

  get sekTotal() {
    return this.dataSource.data
      .filter((account) => account.currency === Currency.SEK)
      .map((account) => account.amount)
      .reduce((acc, curr) => acc + curr, 0);
  }

  get usdTotal() {
    return this.dataSource.data
      .filter((account) => account.currency === Currency.USD)
      .map((account) => account.amount)
      .reduce((acc, curr) => acc + curr, 0);
  }

  ngOnChanges(changes: SimpleChanges) {
    const accounts = changes['accounts'].currentValue;
    if (accounts) {
      this.dataSource.data = [...accounts];
    }
  }

  getEnumValue(e: object, key: string) {
    return (e as Record<string, string>)[key];
  }

  onRowClick(account: Account) {
    this.dialog.open(EditAccountModalComponent, {
      data: {
        workspaceId: this.workspaceService.currentWorkspace()?.id,
        account: { ...account },
      },
      minWidth: '375px',
    });
  }
}
