import { Inject, Injectable } from '@angular/core';
import { API_URL } from '@core/api.token';
import { HttpClient } from '@angular/common/http';
import { ProductDetails } from '@core/models/product.model';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Invoice } from '@core/models/Invoice';

export interface InvoiceProduct {
  product: ProductDetails;
  count: number;
}

export interface InvoicePageState {
  invoiceDetails: Invoice | null;
  activeCategoryId: number | null;
  invoiceProducts: InvoiceProduct[];
  loading: boolean;
}

export const initialState: InvoicePageState = {
  invoiceDetails: null,
  activeCategoryId: null,
  invoiceProducts: [],
  loading: false,
};

@Injectable({ providedIn: 'root' })
export class InvoicePageService {
  private invoiceState = new BehaviorSubject<InvoicePageState>(initialState);
  state$ = this.invoiceState.asObservable().pipe(distinctUntilChanged());

  get state(): InvoicePageState {
    return this.invoiceState.getValue();
  }

  constructor(
    @Inject(API_URL) private api: string,
    private http: HttpClient,
    private router: Router
  ) {}

  setActiveCategory(categoryId: number): void {
    if (this.state.activeCategoryId === categoryId) {
      this.invoiceState.next({
        ...this.state,
        activeCategoryId: null,
      });
    } else {
      this.invoiceState.next({
        ...this.state,
        activeCategoryId: categoryId,
      });
    }

    console.log(this.state.activeCategoryId);
  }

  addInvoiceProduct(product: ProductDetails): void {
    const existingProduct = this.state.invoiceProducts.find(
      x => x.product.id === product.id
    );

    if (existingProduct) {
      const newProductsList = this.state.invoiceProducts.map(item => {
        if (item.product.id === product.id) {
          return {
            product,
            count: item.count + 1,
          };
        }
        return item;
      });
      this.invoiceState.next({
        ...this.state,
        invoiceProducts: newProductsList,
      });
    } else {
      this.invoiceState.next({
        ...this.state,
        invoiceProducts: [...this.state.invoiceProducts, { product, count: 1 }],
      });
    }
  }

  changeProductQuantity(productId: number, type: 'plus' | 'minus'): void {
    const existingProduct = this.state.invoiceProducts.find(
      x => x.product.id === productId
    );

    if (!existingProduct) {
      return;
    }

    const newProductsList = this.state.invoiceProducts.map(item => {
      if (item.product.id === productId) {
        return {
          product: item.product,
          count: type === 'plus' ? item.count + 1 : item.count - 1,
        };
      }
      return item;
    });
    this.invoiceState.next({
      ...this.state,
      invoiceProducts: newProductsList.filter(x => x.count > 0),
    });
  }

  removeInvoiceProduct(productId: number): void {
    const newProductsList = this.state.invoiceProducts.filter(
      item => item.product.id !== productId
    );

    this.invoiceState.next({
      ...this.state,
      invoiceProducts: newProductsList,
    });
  }

  // will be used to populate the state when we need to update an invoice
  editInvoice(invoice: Invoice): void {
    this.invoiceState.next({
      invoiceDetails: invoice,
      loading: false,
      activeCategoryId: null,
      invoiceProducts: invoice.invoice_products.map(invoiceProduct => {
        return {
          product: invoiceProduct.product,
          count: invoiceProduct.quantity,
        };
      }),
    });
  }

  createInvoice(): void {
    this.invoiceState.next({ ...this.state, loading: true });
    const payload = {
      items: this.state.invoiceProducts.map(item => {
        return {
          quantity: item.count,
          price: item.product.price,
          product_id: item.product.id,
        };
      }),
    };

    this.http
      .post(`${this.api}/createInvoice`, payload)
      .pipe(take(1))
      .subscribe(value => {
        this.invoiceState.next(initialState);
        this.router.navigateByUrl('/invoice').then();
        console.log(value);
      });
  }

  updateInvoice(): void {
    const payload = {
      items: this.state.invoiceProducts.map(item => {
        return {
          quantity: item.count,
          price: item.product.price,
          product_id: item.product.id,
        };
      }),
    };

    const path = `${this.api}/updateInvoice/${this.state.invoiceDetails?.id}`;
    this.http
      .post(path, payload)
      .pipe(take(1))
      .subscribe(value => {
        this.invoiceState.next(initialState);
        this.router.navigateByUrl('/invoice').then();
        console.log(value);
      });
  }

  payInvoice(): void {
    const path = `${this.api}/invoices/${this.state.invoiceDetails?.id}/pay`;
    this.http
      .post(path, {})
      .pipe(take(1))
      .subscribe(value => {
        this.invoiceState.next(initialState);
        this.router.navigateByUrl('/invoice').then();
        console.log(value);
      });
  }

  reset(): void {
    this.invoiceState.next(initialState);
  }
}
