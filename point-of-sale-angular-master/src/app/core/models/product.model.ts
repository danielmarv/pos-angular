export interface Product {
  id: number;
  description: string;
  name: string;
  price: number;
  barcode: string;
  low_stock: number;
  optimal_stock: number;
  stock: number;
  stock_type: string;
}

export interface ProductDetails {
  id: number;
  name: string;
  price: number;
  low_stock: number;
  optimal_stock: number;
  barcode: string;
  category_id: number;
  created_at?: any;
  updated_at?: any;
  stock: Stock;
  category: {
    id: number;
    name: string;
  };
}

export interface Stock {
  id: number;
  quantity: number;
  type: string;
  product_id: number;
  created_at?: any;
  updated_at?: any;
}

export interface SaveProductPayload {
  name: string;
  price: number;
  barcode: string;
  low_stock: number;
  optimal_stock: number;
  stock_type: string;
  category_id: number;
}
