import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
} from '@angular/fire/firestore';
import { Bucket, Workspace } from '@budgt/shared/types';
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

  getBuckets(id: string): Observable<Bucket[]> {
    return collectionData(
      collection(this.firestore, 'workspace', id, 'buckets'),
      {
        idField: 'id',
      },
    ) as Observable<Bucket[]>;
  }
}
