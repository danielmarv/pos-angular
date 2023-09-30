import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '@core/services/product.service';
import { SaveProductPayload } from '@core/models/product.model';
import { CategoryService } from '@core/services/category.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  categories$ = this.categoryService.all();

  constructor(
    private router: Router,
    private productsService: ProductService,
    private categoryService: CategoryService
  ) {}

  handleAdd(product: SaveProductPayload): void {
    this.productsService
      .createProduct(product)
      .pipe(take(1))
      .subscribe(res => this.router.navigate(['/products/details', res.id]));
  }
}
