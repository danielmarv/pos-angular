import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AuthInterceptorProvider } from '@app/core/interceptors/auth.interceptor';
import { routes } from '@app/routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const lazyRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./app/routes').then(m => m.routes),
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(lazyRoutes),
      BrowserAnimationsModule,
      HttpClientModule,
      MatSnackBarModule
    ),
    AuthInterceptorProvider,
  ],
}).catch(err => console.error(err));
