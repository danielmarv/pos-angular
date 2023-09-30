import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { convertDateForBE } from '@core/utils/date-utils';
import { Category } from '@core/models/Category';
import { SupplyFilter } from '@core/models/SupplyFilter';

@Component({
  selector: 'app-supplies-search-form',
  templateUrl: './supplies-search-form.component.html',
  styleUrls: ['./supplies-search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuppliesSearchFormComponent {
  @Input() categories: Category[] = [];

  @Output() searched = new EventEmitter<SupplyFilter>();

  form = this.fb.group({
    // productId: '',
    categoryId: '',
    startDate: null,
    endDate: null,
  });

  constructor(private fb: UntypedFormBuilder) {}

  onSubmit(): void {
    const startDate = this.form.get('startDate')!.value;
    const endDate = this.form.get('endDate')!.value;

    const filters = {
      ...this.form.value,
      startDate: convertDateForBE(startDate),
      endDate: convertDateForBE(endDate),
    };

    this.searched.emit(filters);
  }
}
