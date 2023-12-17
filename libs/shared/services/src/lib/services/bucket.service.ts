import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { Bucket } from '@budgt/shared/types';

@Injectable({
  providedIn: 'root',
})
export class BucketService {
  private firestore = inject(Firestore);

  addBucket(workspaceId: string, bucket: Bucket) {
    addDoc(
      collection(this.firestore, 'workspace', workspaceId, 'buckets'),
      bucket,
    );
  }

  updateBucket(workspaceId: string, bucket: Bucket) {
    setDoc(
      doc(this.firestore, 'workspace', workspaceId, 'buckets', bucket.id),
      bucket,
    );
  }

  deleteBucket(workspaceId: string, bucket: Bucket) {
    deleteDoc(
      doc(this.firestore, 'workspace', workspaceId, 'buckets', bucket.id),
    );
  }
}
