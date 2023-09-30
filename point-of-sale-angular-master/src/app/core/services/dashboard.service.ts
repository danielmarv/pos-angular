import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardResponse } from '@core/models/DashboardResponse';
import { API_URL } from '@core/api.token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  data$ = this.http.get<DashboardResponse>(`${this.api}/dashboard/stats`);

  constructor(@Inject(API_URL) private api: string, private http: HttpClient) {}
}
