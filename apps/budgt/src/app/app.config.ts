import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withComponentInputBinding()),
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
    provideAnimations(),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        hideRequiredMarker: true,
      },
    },
  ],
};
