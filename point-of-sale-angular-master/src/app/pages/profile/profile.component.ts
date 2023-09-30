import { Component, Inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { fadeIn } from '@app/animations/fadeIn.animation';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { API_URL } from '@core/api.token';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  animations: [fadeIn],
})
export class ProfileComponent {
  user$ = this.auth.profile$;

  url: string | ArrayBuffer | null | undefined = '';

  editName = false;
  changePassword = false;

  hasPhotoUploaded = false;

  uploadForm: UntypedFormGroup = this.fb.group({
    profile: [''],
  });

  changePasswordForm = this.fb.group(
    {
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    { validators: this.checkPasswords }
  );

  constructor(
    private auth: AuthService,
    private fb: UntypedFormBuilder,
    private snackBar: MatSnackBar,
    @Inject(API_URL) private api: string
  ) {}

  submitName(name: string): void {
    this.editName = false;

    this.auth
      .changeName(name)
      .pipe(take(1))
      .subscribe(user => console.log(user));
  }

  submitChangePassword(): void {
    this.auth
      .changePassword(this.changePasswordForm.value)
      .pipe(take(1))
      .subscribe(
        user => {
          this.changePassword = false;
          this.openSnackBar(
            'Password was changed successfully!',
            'success-snackbar'
          );
        },
        error => {
          this.changePassword = true;
          if (typeof error.error.message === 'string') {
            this.openSnackBar(error.error.message, 'alert-snackbar');
          }
        }
      );
  }

  checkPasswords(group: UntypedFormGroup): null | { notSame: boolean } {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const password = group.get('newPassword')!.value;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const confirmPassword = group.get('confirmPassword')!.value;

    return password === confirmPassword ? null : { notSame: true };
  }

  onSelectFile(event: any): void {
    console.log(event);
    console.log(this.url);
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this.uploadForm?.get('profile')?.setValue(event.target.files[0]);

      reader.readAsDataURL(event.target.files[0]);
      reader.onload = e => {
        // called once readAsDataURL is completed
        this.url = e?.target?.result;
        this.hasPhotoUploaded = true;
        console.log(this.url);
      };
    }
  }

  delete(): void {
    this.url = null;
    this.uploadForm.get('profile')?.patchValue(null);
    this.hasPhotoUploaded = false;
  }

  save(): void {
    console.log(this.url);
    const formData = new FormData();
    formData.append('photo', this.uploadForm?.get('profile')?.value);
    this.auth.changeProfilePhoto(formData).subscribe(
      res => {
        if (res) {
          this.openSnackBar('Photo Changed Successfully', 'success-snackbar');
          this.hasPhotoUploaded = false;
        }
      },
      error => {
        this.openSnackBar(error.message, 'alert-snackbar');
      }
    );
  }

  imageSource(image: string | null): string | ArrayBuffer {
    if (this.url) {
      return this.url;
    } else if (image) {
      return this.api.substring(0, this.api.length - 3) + image;
    } else {
      return 'assets/user.png';
    }
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
