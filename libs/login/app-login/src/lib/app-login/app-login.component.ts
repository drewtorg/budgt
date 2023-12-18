import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '@budgt/shared/services';
import { filter, take, tap } from 'rxjs';

@Component({
  selector: 'budgt-app-login',
  standalone: true,
  imports: [MatButtonModule, AsyncPipe],
  templateUrl: './app-login.component.html',
  styleUrl: './app-login.component.css',
})
export class AppLoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  isLoggedIn$ = this.authService.isLoggedIn$;

  constructor() {
    // TODO: check this won't interfere with auth service sign in redirect
    this.isLoggedIn$
      .pipe(
        take(1),
        filter((loggedIn) => loggedIn),
        tap(() => this.router.navigate(['expenses'])),
      )
      .subscribe();
  }

  async onLogin() {
    await this.authService.signIn();
  }
}
