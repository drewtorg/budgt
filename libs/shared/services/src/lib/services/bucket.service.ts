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

@Injectable({
  providedIn: 'root',
})
export class BucketService {
  private firestore = inject(Firestore);

  getBuckets(workspaceId: string): Observable<Bucket[]> {
    return collectionData(
      collection(this.firestore, 'workspaces', workspaceId, 'buckets'),
      {
        idField: 'id',
      },
    ) as Observable<Bucket[]>;
  }

  addBucket(workspaceId: string, bucket: Bucket) {
    addDoc(
      collection(this.firestore, 'workspaces', workspaceId, 'buckets'),
      bucket,
    );
  }

  updateBucket(workspaceId: string, bucketId: string, bucket: Bucket) {
    setDoc(
      doc(this.firestore, 'workspaces', workspaceId, 'buckets', bucketId),
      bucket,
    );
  }

  deleteBucket(workspaceId: string, bucket: Bucket) {
    deleteDoc(
      doc(this.firestore, 'workspaces', workspaceId, 'buckets', bucket.id),
    );
  }
}
