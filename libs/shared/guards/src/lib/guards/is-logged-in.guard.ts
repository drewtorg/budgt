import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@budgt/shared/services';
import { map, take } from 'rxjs';

export const isLoggedInGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(
    take(1),
    map((l) => (l ? router.createUrlTree(['expenses']) : true)),
  );
};
