import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { AllSuppliesRes } from '@core/models/AllSuppliesRes';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-supplies-table',
  templateUrl: './supplies-table.component.html',
  styleUrls: ['./supplies-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuppliesTableComponent {
  @Input() dataSource!: AllSuppliesRes;

  @Output() paginated = new EventEmitter<PageEvent>();

  displayedColumns = ['id', 'product', 'before', 'after', 'time'];
}
