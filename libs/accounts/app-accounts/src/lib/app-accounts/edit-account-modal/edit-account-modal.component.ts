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
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { enumToDisplayEnum } from '@budgt/shared/functions';
import { AccountService, CategoryService } from '@budgt/shared/services';
import { Account, AccountType, Company, Currency } from '@budgt/shared/types';
import { sekMask, usdMask } from '@budgt/shared/util';
import { InputMaskModule } from '@ngneat/input-mask';
@Component({
  selector: 'budgt-edit-account-modal',
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
    InputMaskModule,
  ],
  templateUrl: './edit-account-modal.component.html',
  styleUrl: './edit-account-modal.component.css',
})
export class EditAccountModalComponent {
  @ViewChild(MatSort) set sort(sort: MatSort | undefined) {
    if (sort) {
      this.dataSource.sort = sort;
    }
  }

  matDialogRef = inject(MatDialogRef<EditAccountModalComponent>);
  data: {
    account: Account;
    workspaceId: string;
  } = inject(MAT_DIALOG_DATA);
  fb = inject(NonNullableFormBuilder);
  categoryService = inject(CategoryService);
  accountService = inject(AccountService);

  sekMask = sekMask;
  usdMask = usdMask;

  Currency = Currency;

  companies = enumToDisplayEnum(Company);
  currencies = enumToDisplayEnum(Currency);
  types = enumToDisplayEnum(AccountType);

  dataSource = new MatTableDataSource<Account>();

  account = this.data.account;
  accountForm = this.fb.group({
    company: [this.account.company, Validators.required],
    type: [this.account.type, Validators.required],
    name: [this.account.name, Validators.required],
    amount: [this.account.amount, Validators.required],
    currency: [this.account.currency, Validators.required],
  });

  onCancel() {
    this.matDialogRef.close();
  }

  onDelete() {
    this.accountService.deleteAccount(this.account);
    this.matDialogRef.close();
  }

  onSave() {
    if (!this.accountForm.valid) {
      return;
    }

    const account = this.accountForm.value as Account;

    if (this.account.id) {
      this.accountService.updateAccount(this.account.id, account);
    } else {
      this.accountService.addAccount(account);
    }

    this.matDialogRef.close();
  }
}
