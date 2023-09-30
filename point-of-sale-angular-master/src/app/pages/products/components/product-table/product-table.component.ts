import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Pagination } from '@core/models/pagination.model';
import { PageEvent } from '@angular/material/paginator';
import { Product } from '@core/models/product.model';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTableComponent {
  @Input() dataSource: Product[] = [];

  @Input() pagination: Pagination = { pageIndex: 0, pageSize: 20, total: 0 };

  @Output() paginated = new EventEmitter<PageEvent>();

  displayedColumns: string[] = [
    'id',
    'name',
    'price',
    'stock',
    'stock_type',
    'barcode',
    'lowStock',
    'optimalStock',
    'actions',
  ];
}
