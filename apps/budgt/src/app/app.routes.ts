import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@budgt/app-login').then((c) => c.AppLoginComponent),
  },
  {
    path: '__/auth/handler',
    loadComponent: () =>
      import('@budgt/app-auth-handler').then((c) => c.AppAuthHandlerComponent),
  },
  {
    path: 'budget',
    loadComponent: () =>
      import('@budgt/app-budget').then((c) => c.AppBudgetComponent),
  },
  {
    path: 'expenses',
    loadComponent: () =>
      import('@budgt/app-expenses').then((c) => c.AppExpensesComponent),
  },
  {
    path: 'savings',
    loadComponent: () =>
      import('@budgt/app-savings').then((c) => c.AppSavingsComponent),
  },
];
