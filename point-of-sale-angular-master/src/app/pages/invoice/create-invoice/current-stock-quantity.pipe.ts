import { Pipe, PipeTransform } from '@angular/core';
import { InvoiceProduct } from '@core/services/invoice-page.service';
import { ProductDetails } from '@core/models/product.model';

@Pipe({
  name: 'currentStockQuantity',
})
export class CurrentStockQuantityPipe implements PipeTransform {
  transform(
    product: ProductDetails,
    invoiceProducts: InvoiceProduct[]
  ): number {
    const invoiceProduct = invoiceProducts.find(
      x => x.product.id === product.id
    );
    if (invoiceProduct) {
      return product.stock.quantity - invoiceProduct.count;
    }
    return product.stock.quantity;
  }
}
