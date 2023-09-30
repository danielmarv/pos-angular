import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LayoutService } from '../layout.service';
import { Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { pluck } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  navItems = this.layoutService.navItems;

  name$ = this.auth.auth$.pipe(pluck('name'));

  constructor(private layoutService: LayoutService, public auth: AuthService) {}
}
