export interface DashboardResponse {
  sales: number;
  invoiceCount: number;
  productSales: ProductSale[];
  salesByCategory: SalesByCategory[];
  lowStockProducts: LowStockProduct[];
}

export interface ProductSale {
  id: number;
  name: string;
  value: number;
}

export interface SalesByCategory {
  name: string;
  value: number;
}

export interface Stock {
  id: number;
  quantity: number;
  type: string;
  product_id: number;
  created_at?: any;
  updated_at?: any;
}

export interface LowStockProduct {
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
}
