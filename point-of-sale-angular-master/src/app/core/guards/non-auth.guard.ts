import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { map, pluck, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NonAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.auth$.pipe(
      pluck('access_token'),
      map(token => {
        if (!token) {
          return true;
        }
        this.router.navigateByUrl('/products');
        return false;
      })
    );
  }
}
