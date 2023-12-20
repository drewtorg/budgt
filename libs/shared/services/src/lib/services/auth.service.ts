import { Injectable, inject } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  user,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  user$ = user(this.auth);
  isLoggedIn$ = this.user$.pipe(map((user) => !!user));

  async signIn() {
    const provider = new GoogleAuthProvider();
    this.auth.useDeviceLanguage();

    await signInWithPopup(this.auth, provider);

    this.router.navigate(['workspace']);
  }

  async signOut() {
    await signOut(this.auth);
  }
}
