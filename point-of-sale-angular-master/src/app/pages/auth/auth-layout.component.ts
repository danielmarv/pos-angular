import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  template: `
    <div class="auth-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .auth-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background-image: linear-gradient(135deg, #97abff 10%, #123597 100%);
      }
    `,
  ],
  standalone: true,
  imports: [RouterModule],
})
export class AuthLayoutComponent {}
