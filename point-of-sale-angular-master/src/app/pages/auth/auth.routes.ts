import { Routes } from '@angular/router';
import { AdminExistsGuard } from '@core/guards/admin-exists.guard';
import { AuthLayoutComponent } from './auth-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        canActivate: [AdminExistsGuard],
        loadComponent: async () =>
          (await import('./login/login.component')).LoginComponent,
      },
      {
        path: 'createAdmin',
        loadComponent: async () =>
          (await import('./create-admin/create-admin.component'))
            .CreateAdminComponent,
      },
    ],
  },
];
