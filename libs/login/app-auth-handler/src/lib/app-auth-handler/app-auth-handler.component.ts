import { Component, OnInit, inject } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  getRedirectResult,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'budgt-app-auth-handler',
  standalone: true,
  imports: [],
  templateUrl: './app-auth-handler.component.html',
  styleUrl: './app-auth-handler.component.css',
})
export class AppAuthHandlerComponent implements OnInit {
  auth = inject(Auth);
  router = inject(Router);

  ngOnInit(): void {
    getRedirectResult(this.auth)
      .then((result) => {
        console.log(result);
        if (!result) {
          return;
        }

        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log(token);

        const user = result.user;
        console.log(user);

        this.router.navigate(['expenses']);
      })
      .catch(() => {});
  }
}
