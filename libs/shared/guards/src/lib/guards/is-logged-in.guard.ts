import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@budgt/shared/services';
import { take, tap } from 'rxjs';

export const isLoggedInGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let isLoggedIn = false;
  authService.isLoggedIn$
    .pipe(
      take(1),
      tap((l) => (isLoggedIn = l)),
    )
    .subscribe();

  if (isLoggedIn) {
    return router.navigate(['expenses']);
  } else {
    return true;
  }
};
