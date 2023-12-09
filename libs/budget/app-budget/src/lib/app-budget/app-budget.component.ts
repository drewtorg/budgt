import { Component } from '@angular/core';
import { UiPageComponent } from '@budgt/shared/components';

@Component({
  selector: 'budgt-app-budget',
  standalone: true,
  imports: [UiPageComponent],
  templateUrl: './app-budget.component.html',
  styleUrl: './app-budget.component.css',
})
export class AppBudgetComponent {
  // expensesByDate$ = this.expenses$.pipe(
  //   map((expenses) => {
  //     return expenses.reduce((acc, curr) => {
  //       if (!acc) {
  //         return {
  //           [curr['date']]: [curr],
  //         };
  //       }
  //       if (!acc[curr['date']]) {
  //         acc[curr['date']] = [curr];
  //       } else {
  //         acc[curr['date']].push(curr);
  //       }
  //       return acc;
  //     }, {});
  //   }),
  // );
  // expensesByDateSorted$ = this.expensesByDate$.pipe(
  //   map((expenses) =>
  //     Object.keys(expenses)
  //       .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
  //       .map((key) => expenses[key]),
  //   ),
  // );
}
