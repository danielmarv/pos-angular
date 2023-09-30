import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ShiftsTableComponent } from './shifts-table/shifts-table.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ShiftsService } from '@core/services/shifts.service';
import { Shift } from '@core/models/shift.model';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { fadeIn } from '@app/animations/fadeIn.animation';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  animations: [fadeIn],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ShiftsTableComponent,
  ],
})
export class ShiftsComponent {
  shifts$: Observable<Shift[]> = this.shifts.all();

  constructor(private shifts: ShiftsService, public dialog: MatDialog) {}

  async addShift(): Promise<void> {
    const { ShiftsFormComponent } = await import(
      './shifts-form/shifts-form.component'
    );

    const dialogRef = this.dialog.open(ShiftsFormComponent, {
      data: {
        type: 'add',
        shift: null,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === '') {
        return;
      }
      this.shifts
        .create(result)
        .pipe(take(1))
        .subscribe(_ => this.refresh());
    });
  }

  async editShift(shift: Shift): Promise<void> {
    const { ShiftsFormComponent } = await import(
      './shifts-form/shifts-form.component'
    );

    const dialogRef = this.dialog.open(ShiftsFormComponent, {
      data: {
        type: 'edit',
        shift,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === '') {
        return;
      }
      this.shifts
        .update(shift.id, result)
        .pipe(take(1))
        .subscribe(_ => this.refresh());
    });
  }

  refresh(): void {
    this.shifts$ = this.shifts.all();
  }
}
