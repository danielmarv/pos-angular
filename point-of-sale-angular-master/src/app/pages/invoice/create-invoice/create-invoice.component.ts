import { Component } from '@angular/core';
import { CategoryService } from '@core/services/category.service';
import { ProductService } from '@core/services/product.service';
import {
  InvoicePageService,
  InvoiceProduct,
} from '@core/services/invoice-page.service';
import { fadeIn } from '@app/animations/fadeIn.animation';
import { ProductDetails } from '@core/models/product.model';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss'],
  animations: [fadeIn],
})
export class CreateInvoiceComponent {
  categories$ = this.categoryService.all();
  products$ = this.productService.filterProducts();

  vm$ = this.invoicePageService.state$;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private invoicePageService: InvoicePageService
  ) {}

  handleProductSearch(event: any): void {
    const query = event.target.value;
    console.log(query);
    this.products$ = this.productService.filterProducts(query);
  }

  setActiveCategory(categoryId: number): void {
    this.invoicePageService.setActiveCategory(categoryId);
    this.products$ = this.productService.filterProducts(undefined, categoryId);
  }

  addItem(product: ProductDetails, invoiceProducts: InvoiceProduct[]): void {
    const item = invoiceProducts.find(x => x.product.id === product.id);
    if (item) {
      if (item.product.stock.quantity <= item.count) {
        return;
      }
    }
    if (product.stock.quantity > 0) {
      this.invoicePageService.addInvoiceProduct(product);
    }
  }

  removeItem(productId: number): void {
    this.invoicePageService.removeInvoiceProduct(productId);
  }

  increaseItemQuantity(productId: number): void {
    this.invoicePageService.changeProductQuantity(productId, 'plus');
  }

  decreaseItemQuantity(productId: number): void {
    this.invoicePageService.changeProductQuantity(productId, 'minus');
  }

  createInvoice(): void {
    this.invoicePageService.createInvoice();
    this.invoicePageService.reset();
  }

  updateInvoice(): void {
    this.invoicePageService.updateInvoice();
    this.invoicePageService.reset();
  }

  payInvoice(): void {
    this.invoicePageService.payInvoice();
  }

  printInvoice(): void {
    window.print();
  }
}
