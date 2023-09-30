import { Component, OnInit } from '@angular/core';
import { fadeIn } from '@app/animations/fadeIn.animation';
import { PageEvent } from '@angular/material/paginator';
import { InvoiceService } from '@core/services/invoice.service';
import { UsersService } from '@core/services/users.service';
import { InvoiceFilter } from '@core/models/InvoiceFilter';
import { Invoice } from '@core/models/Invoice';
import { InvoicePageService } from '@core/services/invoice-page.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
  animations: [fadeIn],
})
export class InvoiceComponent implements OnInit {
  constructor(
    private invoiceService: InvoiceService,
    private usersService: UsersService,
    private auth: AuthService,
    private router: Router,
    private invoicePageService: InvoicePageService
  ) {}

  data$ = this.invoiceService.all(1, 20);
  users$ = this.usersService.users$;

  role = this.auth.role;

  ngOnInit(): void {
    if (this.role !== 'user') {
      this.usersService.loadUsers();
    }
  }

  handlePagination({ pageSize, pageIndex }: PageEvent): void {
    this.data$ = this.invoiceService.all(pageIndex + 1, pageSize);
  }

  handleFilter(filters: InvoiceFilter): void {
    this.data$ = this.invoiceService.all(1, 20, filters);
  }

  editInvoice(invoice: Invoice): void {
    this.invoiceService
      .getById(invoice.id)
      .pipe(take(1))
      .subscribe(invoiceDetails => {
        this.invoicePageService.editInvoice(invoiceDetails);
        this.router.navigateByUrl('/invoice/create');
      });
  }

  resetInvoice(): void {
    this.invoicePageService.reset();
  }
}
