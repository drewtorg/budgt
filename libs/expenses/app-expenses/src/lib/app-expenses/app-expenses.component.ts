import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'budgt-app-expenses',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    AsyncPipe,
    NgFor,
  ],
  templateUrl: './app-expenses.component.html',
  styleUrl: './app-expenses.component.css',
})
export class AppExpensesComponent {
  firestore = inject(Firestore);

  categories = collection(
    this.firestore,
    'budget',
    'fhkEtoq6d1eNN8hfTkLg',
    'categories',
  );
  categories$ = collectionData(this.categories);

  expenses = collection(
    this.firestore,
    'budget',
    'fhkEtoq6d1eNN8hfTkLg',
    'expenses',
  );
  expenses$ = collectionData(this.expenses);
}
