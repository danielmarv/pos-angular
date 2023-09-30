import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@core/services/product.service';
import { switchMap } from 'rxjs/operators';
import { CategoryService } from '@core/services/category.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  product$ = this.route.paramMap.pipe(
    switchMap(params => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this.productService.getById(params.get('id')!);
    })
  );

  categories$ = this.categoryService.all();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}
}
