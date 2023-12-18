import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@budgt/app-login').then((c) => c.AppLoginComponent),
  }, // TODO: add guard for all routes that requires logging in AND selecting a workspace
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
