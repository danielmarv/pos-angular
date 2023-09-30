import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Product } from '@core/models/product.model';
import { ProductsFilter } from '@core/models/products-filter.model';
import { Category } from '@core/models/Category';

@Component({
  selector: 'app-product-filter-form',
  templateUrl: './product-filter-form.component.html',
  styleUrls: ['./product-filter-form.component.scss'],
})
export class ProductFilterFormComponent implements OnInit {
  form = this.fb.group({
    name: '',
    barcode: '',
    hasLowStock: '',
    categoryId: '',
  });

  @Input() filters: ProductsFilter | null = null;

  @Input() categories: Category[] = [];

  @Output() filtered = new EventEmitter<Product>();

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    if (this.filters) {
      this.form.patchValue(this.filters);
    }
  }

  onSubmit(): void {
    this.filtered.emit(this.form.value);
  }
}
