import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { Account } from '@budgt/shared/types';
import { Observable } from 'rxjs';
import { WorkspaceService } from './workspace.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private firestore = inject(Firestore);
  private workspaceService = inject(WorkspaceService);

  getAccounts(): Observable<Account[]> {
    return collectionData(
      collection(
        this.firestore,
        'workspaces',
        this.workspaceService.getWorkspaceId(),
        'accounts',
      ),
      {
        idField: 'id',
      },
    ) as Observable<Account[]>;
  }

  addAccount(account: Account) {
    addDoc(
      collection(
        this.firestore,
        'workspaces',
        this.workspaceService.getWorkspaceId(),
        'accounts',
      ),
      account,
    );
  }

  updateAccount(accountId: string, account: Account) {
    setDoc(
      doc(
        this.firestore,
        'workspaces',
        this.workspaceService.getWorkspaceId(),
        'accounts',
        accountId,
      ),
      account,
    );
  }

  deleteAccount(account: Account) {
    deleteDoc(
      doc(
        this.firestore,
        'workspaces',
        this.workspaceService.getWorkspaceId(),
        'accounts',
        account.id,
      ),
    );
  }

  // getCompanies(): DisplayEnum {
  //   Object.Company
  // }
}
