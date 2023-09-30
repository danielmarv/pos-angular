import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '@core/services/auth.service';
import { handleServerSideValidation } from '@core/utils/server-side-validation';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  hide = true;

  constructor(
    private fb: UntypedFormBuilder,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {}

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.auth
      .login(this.form.value)
      .pipe(take(1))
      .subscribe(
        value => {},
        error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              this.openSnackBar(error.error.message, 'alert-snackbar');
            }
            if (typeof error.error.message === 'string') {
              this.openSnackBar(error.error.message, 'alert-snackbar');
            }
            const unhandledErrors = handleServerSideValidation(
              error,
              this.form
            );
            console.log(unhandledErrors, error);
            if (unhandledErrors) {
              this.openSnackBar(error.statusText, 'error');
            }
          }
        }
      );
  }

  openSnackBar(message: string, panelClass: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass,
    });
  }
}
