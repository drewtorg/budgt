import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Category } from '@budgt/shared/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private firestore = inject(Firestore);

  getCategories(): Observable<Category[]> {
    const categories = collection(
      this.firestore,
      'budget',
      'fhkEtoq6d1eNN8hfTkLg',
      'categories',
    );
    return collectionData(categories, {
      idField: 'id',
    }) as Observable<Category[]>;
  }
}
