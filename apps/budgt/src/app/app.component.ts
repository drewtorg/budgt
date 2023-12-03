import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, AsyncPipe, JsonPipe, NgFor],
  selector: 'budgt-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'budgt';

  firestore = inject(Firestore);

  budgets$ = collectionData(collection(this.firestore, 'budget'));
}
