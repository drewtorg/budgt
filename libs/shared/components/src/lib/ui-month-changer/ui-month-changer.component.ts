import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BudgetService } from '@budgt/shared/services';

@Component({
  selector: 'budgt-ui-month-changer',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './ui-month-changer.component.html',
  styleUrl: './ui-month-changer.component.css',
})
export class UiMonthChangerComponent {
  budgetService = inject(BudgetService);

  onChangeMonth(increment: boolean) {
    this.budgetService.changeBudgetMonth(increment);
  }
}
