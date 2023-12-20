import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WorkspaceService } from '@budgt/shared/services';

export const workspaceGuard: CanActivateFn = () => {
  const workspaceService = inject(WorkspaceService);
  const router = inject(Router);

  const id = workspaceService.getWorkspaceId();
  if (id !== '') {
    return true;
  }

  return router.navigate(['workspace']);
};
