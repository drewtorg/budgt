import { Injectable, inject } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  user,
} from '@angular/fire/auth';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);

  user$ = user(this.auth);
  isLoggedIn$ = this.user$.pipe(map((user) => !!user));

  async signIn() {
    const provider = new GoogleAuthProvider();
    this.auth.useDeviceLanguage();

    await signInWithPopup(this.auth, provider);
    // TODO: on success send user to a page where they can select a workspace and logout
  }

  async signOut() {
    await signOut(this.auth);
  }
}
