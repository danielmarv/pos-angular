import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
  standalone: true,
  imports: [RouterModule],
})
export class AppComponent {}
