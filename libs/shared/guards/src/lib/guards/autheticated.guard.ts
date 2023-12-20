import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@budgt/shared/services';

export const authenticatedGuard: CanActivateFn = () =>
  inject(AuthService).isLoggedIn$;
