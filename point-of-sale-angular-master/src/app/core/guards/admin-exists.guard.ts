import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AdminExistsGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.adminExists$.pipe(
      map(exists => {
        if (!exists) {
          this.router.navigateByUrl('/auth/createAdmin');
        }
        return exists;
      })
    );
  }
}
