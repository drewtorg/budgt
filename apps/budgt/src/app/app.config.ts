import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          apiKey: 'AIzaSyCCvQZ3FZ6AIb2olIUuVf9wbxvuUOZgU6g',
          authDomain: 'budgt-3ecb0.firebaseapp.com',
          databaseURL: 'https://budgt-3ecb0.firebaseio.com',
          projectId: 'budgt-3ecb0',
        }),
      ),
      provideFirestore(() => getFirestore()),
      provideAuth(() => getAuth()),
    ),
  ],
};
