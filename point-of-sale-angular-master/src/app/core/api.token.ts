import { InjectionToken } from '@angular/core';
import { environment } from '../../environments/environment';

export const API_URL = new InjectionToken('API BASE URL', {
  factory: () => environment.apiUrl,
});
