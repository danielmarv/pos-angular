import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { User } from '@core/models/user.model';
import { InvoiceFilter } from '@core/models/InvoiceFilter';
import { convertDateForBE } from '@core/utils/date-utils';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-invoice-filter',
  templateUrl: './invoice-filter.component.html',
  styleUrls: ['./invoice-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceFilterComponent {
  form = this.fb.group({
    user: '',
    isPaid: '',
    startDate: null,
    endDate: null,
  });

  @Input() users: User[] = [];
  @Input() showUsers = true;

  @Output() filtered = new EventEmitter<InvoiceFilter>();

  constructor(private fb: UntypedFormBuilder, private auth: AuthService) {}

  onSubmit(): void {
    const startDate = this.form.get('startDate')!.value;
    const endDate = this.form.get('endDate')!.value;

    const filters = {
      ...this.form.value,
      startDate: convertDateForBE(startDate),
      endDate: convertDateForBE(endDate),
    };

    this.filtered.emit(filters);
  }
}
