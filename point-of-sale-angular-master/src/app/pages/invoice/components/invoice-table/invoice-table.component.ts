import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AllInvoicesRes, Invoice } from '@core/models/Invoice';

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  styleUrls: ['./invoice-table.component.scss'],
})
export class InvoiceTableComponent {
  @Input() dataSource!: AllInvoicesRes;

  @Output() paginated = new EventEmitter<PageEvent>();
  @Output() invoiceClicked = new EventEmitter<Invoice>();

  displayedColumns = ['id', 'user', 'total', 'paid', 'time'];
}
