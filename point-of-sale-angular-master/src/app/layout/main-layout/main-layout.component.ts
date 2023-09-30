import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Data, RouterOutlet, RouterModule } from '@angular/router';
import { NavbarComponent } from '@app/layout/navbar/navbar.component';
import { slideInAnimation } from '@app/layout/animations';

@Component({
  selector: 'app-main-layout',
  template: `
    <app-navbar class="navbar"></app-navbar>
    <div class="container-fluid py-4">
      <div [@routeAnimations]="prepareRoute(outlet)">
        <router-outlet #outlet="outlet"></router-outlet>
      </div>
    </div>
  `,
  styles: [
    `
      @media print {
        .navbar {
          display: none;
        }
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  animations: [slideInAnimation],
})
export class MainLayoutComponent {
  prepareRoute(outlet: RouterOutlet): Data {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
