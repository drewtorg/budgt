import { Component, Input } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NavRailRouteItem } from '../types';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'budgt-ui-nav-rail',
  standalone: true,
  imports: [NgFor, NgClass, MatIconModule, RouterModule],
  templateUrl: './ui-nav-rail.component.html',
  styleUrl: './ui-nav-rail.component.css',
})
export class UiNavRailComponent {
  @Input() routes: NavRailRouteItem[] = [];
}
