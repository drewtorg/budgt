import { Injectable, inject } from '@angular/core';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Workspace } from '@budgt/shared/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  private firestore = inject(Firestore);

  getWorkspace(id: string): Observable<Workspace> {
    const workspace = doc(this.firestore, 'workspace', id);
    return docData(workspace, {
      idField: 'id',
    }) as Observable<Workspace>;
  }
}
