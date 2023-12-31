import { Route } from '@angular/router';
import {
  authenticatedGuard,
  isLoggedInGuard,
  workspaceGuard,
} from '@budgt/shared/guards';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@budgt/login/app-login').then((c) => c.AppLoginComponent),
    canActivate: [isLoggedInGuard],
  },
  {
    path: 'workspace',
    loadComponent: () =>
      import('@budgt/login/app-workspace').then((c) => c.AppWorkspaceComponent),
    canActivate: [authenticatedGuard],
  },
  {
    path: 'budget',
    loadComponent: () =>
      import('@budgt/budget/app-budget').then((c) => c.AppBudgetComponent),
    canActivate: [authenticatedGuard, workspaceGuard],
  },
  {
    path: 'expenses',
    loadComponent: () =>
      import('@budgt/expenses/app-expenses').then(
        (c) => c.AppExpensesComponent,
      ),
    canActivate: [authenticatedGuard, workspaceGuard],
  },
  {
    path: 'savings',
    loadComponent: () =>
      import('@budgt/savings/app-savings').then((c) => c.AppSavingsComponent),
    canActivate: [authenticatedGuard, workspaceGuard],
  },
  {
    path: 'accounts',
    loadComponent: () =>
      import('@budgt/accounts/app-accounts').then(
        (c) => c.AppAccountsComponent,
      ),
    canActivate: [authenticatedGuard, workspaceGuard],
  },
];
