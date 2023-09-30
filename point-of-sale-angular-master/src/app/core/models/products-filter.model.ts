export interface ProductsFilter {
  id: number;
  description: string;
  name: string;
  price: number;
  barcode: string;
  lowStock: number;
  optimalStock: number;
  stock: number;
  stock_type: string;
}
