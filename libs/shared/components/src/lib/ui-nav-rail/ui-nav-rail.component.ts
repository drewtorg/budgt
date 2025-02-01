import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NavRailRouteItem } from '../types';

@Component({
  selector: 'budgt-ui-nav-rail',
  standalone: true,
  imports: [NgFor, MatIconModule, RouterModule],
  templateUrl: './ui-nav-rail.component.html',
  styleUrl: './ui-nav-rail.component.css',
})
export class UiNavRailComponent {
  @Input() routes: NavRailRouteItem[] = [];
}
