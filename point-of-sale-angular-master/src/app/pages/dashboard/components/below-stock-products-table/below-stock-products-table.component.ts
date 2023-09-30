import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { LowStockProduct } from '@core/models/DashboardResponse';

@Pipe({ name: 'stockColor', standalone: true })
export class StockColorPipe implements PipeTransform {
  transform(stock: number, minimumStock: number): string {
    const limit = minimumStock * 0.2;
    return minimumStock - stock <= limit ? '#F7C600' : 'red';
  }
}

@Component({
  selector: 'app-below-stock-products-table',
  templateUrl: './below-stock-products-table.component.html',
  styleUrls: ['./below-stock-products-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    RouterModule,
    StockColorPipe,
  ],
})
export class BelowStockProductsTableComponent {
  @Input() dataSource: LowStockProduct[] = [];

  displayedColumns = ['name', 'minimumStock', 'stock', 'button'];
}
