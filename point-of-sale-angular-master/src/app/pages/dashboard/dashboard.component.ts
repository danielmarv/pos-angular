import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@core/services/dashboard.service';
import { DashboardResponse } from '@core/models/DashboardResponse';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  data: Partial<DashboardResponse> = {
    sales: undefined,
    invoiceCount: undefined,
    productSales: undefined,
    salesByCategory: undefined,
    lowStockProducts: undefined,
  };

  loading = false;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getDashboardStats();
  }

  getDashboardStats(): void {
    this.loading = true;
    this.dashboardService.data$.pipe(take(1)).subscribe(res => {
      this.data = res;
      this.loading = false;
    });
  }
}
