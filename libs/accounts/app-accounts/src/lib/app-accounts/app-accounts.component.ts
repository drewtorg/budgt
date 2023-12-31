import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { UiPageComponent } from '@budgt/shared/components';
import { AccountService } from '@budgt/shared/services';
import { AccountTableComponent } from './account-table/account-table.component';
import { EditAccountModalComponent } from './edit-account-modal/edit-account-modal.component';

@Component({
  selector: 'budgt-app-accounts',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatCardModule,
    UiPageComponent,
    AccountTableComponent,
  ],
  templateUrl: './app-accounts.component.html',
  styleUrl: './app-accounts.component.css',
})
export class AppAccountsComponent {
  dialog = inject(MatDialog);

  accountService = inject(AccountService);

  accounts$ = this.accountService.getAccounts();

  onAddAccount() {
    this.dialog.open(EditAccountModalComponent, {
      data: {
        account: {},
      },
      minWidth: '375px',
    });
  }
}
