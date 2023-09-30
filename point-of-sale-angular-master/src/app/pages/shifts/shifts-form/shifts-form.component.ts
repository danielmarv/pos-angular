import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ShiftsFormData } from '@app/pages/shifts/ShiftsFormData';

@Component({
  selector: 'app-shifts-form',
  templateUrl: './shifts-form.component.html',
  styles: [
    `
      form {
        display: flex;
        flex-direction: column;
        gap: 5px;
        min-width: 300px;
      }
    `,
  ],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [ReactiveFormsModule],
})
export class ShiftsFormComponent implements OnInit {
  form = this.fb.group({
    name: ['', Validators.required],
    start_time: ['', Validators.required],
    end_time: ['', Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ShiftsFormData,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    if (this.data.type === 'edit' && this.data.shift) {
      this.form.patchValue(this.data.shift);
    }
  }
}
