import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { InvoiceProduct } from '@core/services/invoice-page.service';

@Component({
  selector: 'app-create-invoice-table',
  templateUrl: './create-invoice-table.component.html',
  styleUrls: ['./create-invoice-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateInvoiceTableComponent {
  @Input() invoiceProducts: InvoiceProduct[] = [];

  @Output() removed = new EventEmitter<number>();

  @Output() increase = new EventEmitter<number>();
  @Output() decrease = new EventEmitter<number>();

  displayedColumns: string[] = ['name', 'price', 'count', 'total', 'remove'];

  allTotal(): number {
    let total = 0;

    this.invoiceProducts.forEach(item => {
      total += item.product.price * item.count;
    });

    return total;
  }
}
