import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Shift } from '@core/models/shift.model';

@Component({
  selector: 'app-shifts-table',
  templateUrl: './shifts-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatTableModule],
})
export class ShiftsTableComponent {
  @Input() data: Shift[] = [];

  @Output() opened = new EventEmitter<Shift>();

  displayedColumns: string[] = ['id', 'name', 'start_time', 'end_time'];
}
