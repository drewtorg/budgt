import { Component, inject } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
} from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'budgt-app-login',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './app-login.component.html',
  styleUrl: './app-login.component.css',
})
export class AppLoginComponent {
  auth = inject(Auth);

  onLogin() {
    const provider = new GoogleAuthProvider();
    this.auth.useDeviceLanguage();

    signInWithRedirect(this.auth, provider);
  }

  onLogout() {
    signOut(this.auth).then(() => {
      console.log('signed out');
    });
  }
}
