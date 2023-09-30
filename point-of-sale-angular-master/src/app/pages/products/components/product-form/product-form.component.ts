import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ProductDetails, SaveProductPayload } from '@core/models/product.model';
import { Category } from '@core/models/Category';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  @Input() product?: ProductDetails;

  @Input() categories: Category[] = [];

  @Input() readonly = false;

  @Output() submitted = new EventEmitter<SaveProductPayload>();

  form = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    barcode: ['', Validators.required],
    low_stock: ['', Validators.required],
    optimal_stock: ['', Validators.required],
    stock_type: ['', Validators.required],
    category_id: ['', Validators.required],
  });

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    if (this.product) {
      this.form.patchValue(this.product);
      this.form.get('stock_type')?.patchValue(this.product.stock.type);
    }
    if (this.readonly) {
      this.form.disable();
    }
  }

  handleSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitted.emit(this.form.value);
  }
}
