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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Category } from '@app/core/models/Category';

export interface CategoryFormData {
  type: 'add' | 'edit';
  category: Category | null;
}

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
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
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class CategoryFormComponent implements OnInit {
  form = this.fb.group({
    name: ['', Validators.required],
    icon: ['', Validators.required],
    color: ['', Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CategoryFormData,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    if (this.data.type === 'edit' && this.data.category) {
      this.form.patchValue(this.data.category);
    }
  }
}
