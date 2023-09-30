import { ProductDetails } from '@core/models/product.model';

export interface ProductsFilterRes {
  current_page: number;
  data: ProductDetails[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url?: any;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}
