import { Inject, Injectable } from '@angular/core';
import { SupplyFilter } from '@core/models/SupplyFilter';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_URL } from '@core/api.token';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '@core/models/Invoice';
import { createParamsFromObject } from '@core/utils/create-params-from-object';
import { tap } from 'rxjs/operators';
import { AllSuppliesRes } from '@core/models/AllSuppliesRes';

export interface SupplyState {
  filters: SupplyFilter | null;
}

export const initialState: SupplyState = {
  filters: null,
};

@Injectable({ providedIn: 'root' })
export class SupplyService {
  private supplyState = new BehaviorSubject<SupplyState>(initialState);

  get state(): SupplyState {
    return this.supplyState.getValue();
  }

  constructor(@Inject(API_URL) private api: string, private http: HttpClient) {}

  all(
    page: number,
    pageSize: number,
    filters?: Partial<SupplyFilter>
  ): Observable<AllSuppliesRes> {
    let finalFilters: Partial<SupplyFilter> = this.state.filters ?? {};

    if (filters) {
      finalFilters = filters;
    }

    const params = createParamsFromObject(finalFilters)
      .append('page', page)
      .append('pageSize', pageSize);

    return this.http
      .get<AllSuppliesRes>(`${this.api}/supplies`, { params })
      .pipe(tap(x => console.log(x)));
  }

  getById(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.api}/invoices/${id}`);
  }

  create(payload: {
    productId: number;
    supplyQuantity: number;
  }): Observable<any> {
    return this.http.post<any>(`${this.api}/supplies/create`, payload);
  }
}
