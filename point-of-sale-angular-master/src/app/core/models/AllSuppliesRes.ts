import { Product, Stock } from '@core/models/product.model';

export interface Supply {
  id: number;
  before_supply: number;
  after_supply: number;
  product_id: number;
  stock_id: number;
  category_id: number;
  created_at: Date;
  updated_at: Date;
  stock: Stock;
  product: Product;
}

export interface AllSuppliesRes {
  current_page: number;
  data: Supply[];
  from: number;
  last_page: number;
  path: string;
  per_page: string;
  to: number;
  total: number;
}
