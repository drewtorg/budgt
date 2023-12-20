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
import { Bucket } from '@budgt/shared/types';
import { Observable } from 'rxjs';
import { WorkspaceService } from './workspace.service';

@Injectable({
  providedIn: 'root',
})
export class BucketService {
  private firestore = inject(Firestore);
  private workspaceService = inject(WorkspaceService);

  getBuckets(): Observable<Bucket[]> {
    return collectionData(
      collection(
        this.firestore,
        'workspaces',
        this.workspaceService.getWorkspaceId(),
        'buckets',
      ),
      {
        idField: 'id',
      },
    ) as Observable<Bucket[]>;
  }

  addBucket(bucket: Bucket) {
    addDoc(
      collection(
        this.firestore,
        'workspaces',
        this.workspaceService.getWorkspaceId(),
        'buckets',
      ),
      bucket,
    );
  }

  updateBucket(bucketId: string, bucket: Bucket) {
    setDoc(
      doc(
        this.firestore,
        'workspaces',
        this.workspaceService.getWorkspaceId(),
        'buckets',
        bucketId,
      ),
      bucket,
    );
  }

  deleteBucket(bucket: Bucket) {
    deleteDoc(
      doc(
        this.firestore,
        'workspaces',
        this.workspaceService.getWorkspaceId(),
        'buckets',
        bucket.id,
      ),
    );
  }
}
