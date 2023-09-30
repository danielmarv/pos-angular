import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice.component';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { InvoiceTableComponent } from './components/invoice-table/invoice-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InvoiceFilterComponent } from './components/invoice-filter/invoice-filter.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CreateInvoiceTableComponent } from './components/create-invoice-table/create-invoice-table.component';
import { CurrentStockQuantityPipe } from './create-invoice/current-stock-quantity.pipe';
import { InvoiceFormatComponent } from './components/invoice-format/invoice-format.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { QRCodeModule } from 'angularx-qrcode';
import { QrCodeModule } from 'ng-qrcode';

const routes: Routes = [
  { path: '', component: InvoiceComponent },
  { path: 'create', component: CreateInvoiceComponent },
];

@NgModule({
  declarations: [
    InvoiceComponent,
    CreateInvoiceComponent,
    InvoiceTableComponent,
    InvoiceFilterComponent,
    CreateInvoiceTableComponent,
    CurrentStockQuantityPipe,
    InvoiceFormatComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgxBarcodeModule,
    QrCodeModule,
  ],
  exports: [RouterModule],
})
export class InvoiceModule {}
