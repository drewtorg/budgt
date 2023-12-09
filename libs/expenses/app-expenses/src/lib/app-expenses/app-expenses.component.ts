import { Component, Input, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MonthYearPipe, UiPageComponent } from '@budgt/shared/components';
import { AddExpenseFormComponent } from './add-expense-form/add-expense-form.component';
import { ExpenseTableComponent } from './expense-table/expense-table.component';

@Component({
  selector: 'budgt-app-expenses',
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MonthYearPipe,
    UiPageComponent,
    AddExpenseFormComponent,
    ExpenseTableComponent,
  ],
  templateUrl: './app-expenses.component.html',
  styleUrl: './app-expenses.component.css',
})
export class AppExpensesComponent implements OnInit {
  @Input() month = 0;
  @Input() year = 0;

  router = inject(Router);
  route = inject(ActivatedRoute);

  get currentMonth() {
    return {
      year: this.year,
      month: this.month,
    };
  }

  ngOnInit() {
    this.normalizeQueryParams();
  }

  normalizeQueryParams() {
    this.month = this.month
      ? parseInt(this.month as unknown as string)
      : new Date().getMonth() + 1;
    this.year = this.year
      ? parseInt(this.year as unknown as string)
      : new Date().getFullYear();
  }

  onChangeMonth(increment: boolean) {
    this.normalizeQueryParams();

    if (increment && this.month === 12) {
      this.month = 1;
      this.year++;
    } else if (!increment && this.month === 1) {
      this.month = 12;
      this.year--;
    } else {
      this.month += increment ? 1 : -1;
    }

    this.router.navigate(['expenses'], {
      queryParams: {
        month: this.month,
        year: this.year,
      },
    });

    this.normalizeQueryParams();
  }
}
