import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CategoryService } from '@core/services/category.service';
import { SupplyFilter } from '@core/models/SupplyFilter';
import { SupplyService } from '@core/services/supply.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuppliesComponent {
  categories$ = this.categoryService.all();

  data$ = this.supplyService.all(1, 20);

  constructor(
    private categoryService: CategoryService,
    private supplyService: SupplyService
  ) {}

  handlePagination({ pageSize, pageIndex }: PageEvent): void {
    this.data$ = this.supplyService.all(pageIndex + 1, pageSize);
  }

  handleSearch(filters: SupplyFilter): void {
    this.data$ = this.supplyService.all(1, 20, filters);
  }
}
