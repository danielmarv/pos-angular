import { Component } from '@angular/core';
import { switchMap, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@core/services/product.service';
import { CategoryService } from '@core/services/category.service';
import { SaveProductPayload } from '@core/models/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent {
  product$ = this.route.paramMap.pipe(
    switchMap(params => this.productService.getById(params.get('id')!))
  );

  categories$ = this.categoryService.all();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  handleEdit(id: number, product: SaveProductPayload): void {
    this.productService
      .updateProduct(id, product)
      .pipe(take(1))
      .subscribe(res => this.router.navigate(['/products/details', res.id]));
  }
}
