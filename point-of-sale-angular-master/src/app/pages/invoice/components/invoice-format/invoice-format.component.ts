import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-format',
  templateUrl: './invoice-format.component.html',
  styleUrls: ['./invoice-format.component.scss'],
})
export class InvoiceFormatComponent implements OnInit {
  @Input() invoiceDetails: any;
  constructor() {}
  barcode = '';
  qrCodeLink = '';
  ngOnInit(): void {
    console.log(this.invoiceDetails);
    this.qrCodeLink = 'http://localhost:4200/invoice';
    this.barcode = this.invoiceDetails.id.toString().padStart(10, '0');
  }
}
