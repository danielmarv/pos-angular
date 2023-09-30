import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { ProductService } from '@core/services/product.service';
import { Observable } from 'rxjs';
import { ProductDetails } from '@core/models/product.model';
import { SupplyService } from '@core/services/supply.service';

@Component({
  selector: 'app-add-supply',
  templateUrl: './add-supply.component.html',
  styleUrls: ['./add-supply.component.scss'],
})
export class AddSupplyComponent {
  product$: Observable<ProductDetails> = this.route.paramMap.pipe(
    switchMap(params => this.productService.getById(params.get('productId')!))
  );

  form = this.fb.group({
    supplyQuantity: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private supplyService: SupplyService
  ) {}

  onSubmit(product: ProductDetails): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this.supplyService
        .create({
          supplyQuantity: this.form.value.supplyQuantity,
          productId: product.id,
        })
        .pipe(take(1))
        .subscribe(res => {
          this.router.navigateByUrl('/supplies').then();
        });
    }
  }
}
