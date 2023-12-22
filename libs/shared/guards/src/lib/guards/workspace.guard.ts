import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router } from '@angular/router';
import { BudgetService, WorkspaceService } from '@budgt/shared/services';
import { filter } from 'rxjs';

export const workspaceGuard: CanActivateFn = () => {
  const workspaceService = inject(WorkspaceService);
  const budgetService = inject(BudgetService);
  const router = inject(Router);

  const id = workspaceService.getWorkspaceId();
  if (id !== '') {
    return toObservable(budgetService.hasCurrentBudget).pipe(
      filter((hasCurrentBudget) => hasCurrentBudget),
    );
  }

  return router.navigate(['workspace']);
};
