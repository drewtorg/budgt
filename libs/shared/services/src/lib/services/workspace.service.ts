import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  query,
  where,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Workspace } from '@budgt/shared/types';
import { Observable, filter, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  private firestore = inject(Firestore);
  private router = inject(Router);

  private WORKSPACE_ID_KEY = 'budgt-workspace';

  setStoredWorkspace(id: string) {
    localStorage.setItem(this.WORKSPACE_ID_KEY, id);
  }

  getStoredWorkspace(): string | null {
    return localStorage.getItem(this.WORKSPACE_ID_KEY);
  }

  getWorkspace(id: string): Observable<Workspace> {
    const workspace = doc(this.firestore, 'workspace', id);
    return docData(workspace, {
      idField: 'id',
    }) as Observable<Workspace>;
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
        tap((w) => this.setStoredWorkspace(w[0].id)),
        tap(() => this.router.navigate(['budget'])),
      )
      .subscribe();
  }

  async addWorkspace(workspace: Workspace): Promise<Workspace> {
    return (await addDoc(
      collection(this.firestore, 'workspaces'),
      workspace,
    )) as unknown as Workspace;
  }
}
