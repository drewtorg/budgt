import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  query,
  where,
} from '@angular/fire/firestore';
import { Category } from '@budgt/shared/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private firestore = inject(Firestore);

  getCategories(): Observable<Category[]> {
    const categories = query(
      collection(
        this.firestore,
        'budget',
        'fhkEtoq6d1eNN8hfTkLg',
        'categories',
      ),
    );
    return collectionData(categories, {
      idField: 'id',
    }) as Observable<Category[]>;
  }

  getExpenseCategories(): Observable<Category[]> {
    const categories = query(
      collection(
        this.firestore,
        'budget',
        'fhkEtoq6d1eNN8hfTkLg',
        'categories',
      ),
      where('type', '==', 'expense'),
    );
    return collectionData(categories, {
      idField: 'id',
    }) as Observable<Category[]>;
  }

  removeCategory(id: string) {
    deleteDoc(
      doc(this.firestore, 'budget', 'fhkEtoq6d1eNN8hfTkLg', 'categories', id),
    );
  }
}
