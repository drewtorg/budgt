import { Injectable, computed, effect, inject, signal } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  docData,
} from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { dateToString } from '@budgt/shared/functions';
import { Budget } from '@budgt/shared/types';
import { Observable, ReplaySubject, combineLatest, of, take, tap } from 'rxjs';
import { WorkspaceService } from './workspace.service';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private firestore = inject(Firestore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private workspaceService = inject(WorkspaceService);

  currentBudget = signal<Budget | undefined>(undefined);
  currentMonth = signal(new Date().getMonth() + 1);
  currentYear = signal(new Date().getFullYear());

  hasCurrentBudget = computed(() => !!this.currentBudget());
  currentBudgetDate = computed(
    () => new Date(this.currentYear(), this.currentMonth() - 1, 1),
  );
  currentBudgetDateString = computed(() =>
    dateToString(this.currentBudgetDate()),
  );

  changeBudgetMonth$ = new ReplaySubject<void>();
  loadBudget$ = combineLatest([this.changeBudgetMonth$]);

  constructor() {
    effect(
      () => {
        this.getBudgetByDate(this.currentMonth(), this.currentYear())
          .pipe(
            take(1),
            tap((budget) => this.currentBudget.set(budget)),
            tap(() => this.changeBudgetMonth$.next()),
          )
          .subscribe();
      },
      {
        allowSignalWrites: true,
      },
    );

    this.route.queryParams
      .pipe(
        tap((params) => {
          const month = params['month']
            ? parseInt(params['month'])
            : new Date().getMonth() + 1;
          const year = params['year']
            ? parseInt(params['year'])
            : new Date().getFullYear();

          this.currentMonth.set(month);
          this.currentYear.set(year);
        }),
      )
      .subscribe();
  }

  getBudget(id: string): Observable<Budget> {
    return docData(doc(this.firestore, 'budget', id), {
      idField: 'id',
    }) as Observable<Budget>;
  }

  getBudgetByDate(month: number, year: number): Observable<Budget | undefined> {
    const id =
      this.workspaceService.currentWorkspace()?.budgets[
        year.toString() + '-' + month.toString()
      ];
    return id ? this.getBudget(id) : of(undefined);
  }

  async addBudget(budget: Budget) {
    const ref = await addDoc(collection(this.firestore, 'budget'), budget);
    return docData(ref, {
      idField: 'id',
    }) as Observable<Budget>;
  }

  changeBudgetMonth(increment: boolean) {
    let month = this.currentMonth();
    let year = this.currentYear();
    if (increment && month === 12) {
      month = 1;
      year++;
    } else if (!increment && month === 1) {
      month = 12;
      year--;
    } else {
      month += increment ? 1 : -1;
    }

    this.router.navigate([], {
      queryParams: {
        month,
        year,
      },
    });
  }
}
