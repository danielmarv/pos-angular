import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { pluck } from 'rxjs/operators';
import { LayoutService } from '@app/layout/layout.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private layoutService: LayoutService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
    // let response = false;
    // this.layoutService.navItems.map(navItem => {
    //   if (navItem.path === route.url[0].path) {
    //     if (navItem.roles.includes(this.auth.getLocalState().role as string)) {
    //       response = true;
    //       return;
    //     } else {
    //       return;
    //     }
    //   }
    // });
    // return response;
  }
}
