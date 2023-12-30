import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UiPageComponent } from '@budgt/shared/components';
import { BudgetService, WorkspaceService } from '@budgt/shared/services';

@Component({
  selector: 'budgt-app-workspace',
  standalone: true,
  imports: [
    UiPageComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './app-workspace.component.html',
  styleUrl: './app-workspace.component.css',
})
export class AppWorkspaceComponent {
  fb = inject(NonNullableFormBuilder);
  workspaceService = inject(WorkspaceService);
  budgetService = inject(BudgetService);

  workspaceForm = this.fb.group({
    name: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    if (!this.workspaceForm.valid) {
      return;
    }
    this.workspaceService.signInToWorkspace(
      this.workspaceForm.controls.name.value,
      this.workspaceForm.controls.password.value,
    );
  }

  // async onCreateWorkspace() {
  //   const today = new Date();
  //   const firstOfMonth = today.setDate(1);
  //   const thisMonth = formatDate(firstOfMonth, 'yyyy-MM', 'en-US');

  //   const budget = await this.budgetService.addBudget({
  //     date: thisMonth,
  //     categories: [],
  //     expenses: [],
  //   } as unknown as Budget);

  //   const workspace = {
  //     name: this.workspaceForm.controls.name.value,
  //     password: this.workspaceForm.controls.password.value,
  //     buckets: [],
  //     budgets: {
  //       [thisMonth]: budget.id,
  //     },
  //   } as unknown as Workspace;

  //   await this.workspaceService.addWorkspace(workspace);
  // }
}
