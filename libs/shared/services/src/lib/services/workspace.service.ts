import { Injectable, inject, signal } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Workspace } from '@budgt/shared/types';
import { Observable, filter, lastValueFrom, map, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  private firestore = inject(Firestore);
  private router = inject(Router);

  private WORKSPACE_ID_KEY = 'budgt-workspace';

  currentWorkspace = signal<Workspace | undefined>(undefined);

  constructor() {
    this.initializeWorkspace();
  }

  setWorkspaceId(id: string) {
    localStorage.setItem(this.WORKSPACE_ID_KEY, id);
  }

  getWorkspaceId(): string {
    return localStorage.getItem(this.WORKSPACE_ID_KEY) ?? '';
  }

  initializeWorkspace() {
    const id = this.getWorkspaceId();

    if (id !== '') {
      this.getWorkspace(id)
        .pipe(
          take(1),
          tap((w) => this.currentWorkspace.set(w as Workspace)),
        )
        .subscribe();
    }
  }

  signInToWorkspace(name: string, password: string) {
    const workspaces = query(
      collection(this.firestore, 'workspaces'),
      where('name', '==', name),
      where('password', '==', password),
    );
    const data = collectionData(workspaces, {
      idField: 'id',
    }) as Observable<Workspace[]>;

    data
      .pipe(
        take(1),
        filter((w) => w.length > 0),
        map((w) => w[0]),
        tap((w) => this.setWorkspaceId(w.id)),
        tap((w) => this.currentWorkspace.set(w as Workspace)),
        tap(() => this.router.navigate(['budget'])),
      )
      .subscribe();
  }

  getWorkspace(id: string) {
    return docData(doc(this.firestore, 'workspaces', id), {
      idField: 'id',
    });
  }

  addBudgetToWorkspace(budgetId: string, month: string) {
    const key = 'budgets.' + month;
    updateDoc(doc(this.firestore, 'workspaces', this.currentWorkspace()!.id), {
      [key]: budgetId,
    });
  }

  async addWorkspace(workspace: Workspace) {
    const ref = await addDoc(
      collection(this.firestore, 'workspaces'),
      workspace,
    );
    return lastValueFrom(
      docData(ref, {
        idField: 'id',
      }),
    );
  }
}
