import { Component, Input, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Firestore,
  Query,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  query,
  where,
} from '@angular/fire/firestore';
import {
  AsyncPipe,
  CurrencyPipe,
  JsonPipe,
  NgFor,
  NgIf,
} from '@angular/common';
import { Observable } from 'rxjs';
import { AmountPipe } from '@budgt/shared/components';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'budgt-app-expenses',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule,
    AsyncPipe,
    NgFor,
    JsonPipe,
    CurrencyPipe,
    AmountPipe,
    RouterModule,
    NgIf,
  ],
  templateUrl: './app-expenses.component.html',
  styleUrl: './app-expenses.component.css',
})
export class AppExpensesComponent implements OnInit {
  @Input() month = '';
  @Input() year = '';

  firestore = inject(Firestore);
  router = inject(Router);
  route = inject(ActivatedRoute);
  fb = inject(NonNullableFormBuilder);

  categories = collection(
    this.firestore,
    'budget',
    'fhkEtoq6d1eNN8hfTkLg',
    'categories',
  );
  categories$ = collectionData(this.categories);

  displayedColumns = ['date', 'amount', 'category'];

  expenseForm = this.fb.group({
    amount: ['', Validators.required],
    category: ['', Validators.required],
    date: [new Date(), Validators.required],
  });

  expenses?: Query;
  expenses$?: Observable<any>;

  ngOnInit() {
    if (!this.month) {
      this.month = (new Date().getMonth() + 1).toString();
    }

    if (!this.year) {
      this.year = new Date().getFullYear().toString();
    }

    this.expenses = query(
      collection(this.firestore, 'budget', 'fhkEtoq6d1eNN8hfTkLg', 'expenses'),
      where('month', '==', this.month),
      where('year', '==', this.year),
    );
    this.expenses$ = collectionData(this.expenses, {
      idField: 'id',
    });
  }

  onSubmit() {
    if (!this.expenseForm.valid) {
      return;
    }

    const dateSections =
      this.expenseForm.value.date?.toISOString().split('T')[0].split('-') ?? [];

    addDoc(
      collection(this.firestore, 'budget', 'fhkEtoq6d1eNN8hfTkLg', 'expenses'),
      {
        amount: this.expenseForm.value.amount,
        category: this.expenseForm.value.category,
        year: dateSections[0],
        month: dateSections[1],
        day: dateSections[2],
      },
    );

    this.expenseForm.setValue({
      amount: '',
      category: '',
      date: new Date(),
    });
  }

  onRemove(id: string) {
    deleteDoc(
      doc(this.firestore, 'budget', 'fhkEtoq6d1eNN8hfTkLg', 'expenses', id),
    );
  }
}
