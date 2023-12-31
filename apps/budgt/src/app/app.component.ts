import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavRailRouteItem, UiNavRailComponent } from '@budgt/shared/components';
import { tap } from 'rxjs';

@Component({
  standalone: true,
  imports: [RouterModule, UiNavRailComponent],
  selector: 'budgt-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);

  routes: NavRailRouteItem[] = [
    {
      href: 'expenses',
      icon: 'credit_card',
      name: 'Expenses',
      active: false,
    },
    {
      href: 'budget',
      icon: 'attach_money',
      name: 'Budget',
      active: false,
    },
    {
      href: 'savings',
      icon: 'savings',
      name: 'Buckets',
      active: false,
    },
    {
      href: 'accounts',
      icon: 'request_quote',
      name: 'Overview',
      active: false,
    },
  ];

  constructor() {
    this.router.events.pipe(tap(() => this.setActiveRoutes())).subscribe();
  }

  setActiveRoutes() {
    this.routes.forEach(
      (r) =>
        (r.active = this.router.isActive(r.href, {
          queryParams: 'ignored',
          fragment: 'ignored',
          paths: 'exact',
          matrixParams: 'ignored',
        })),
    );
  }
}
