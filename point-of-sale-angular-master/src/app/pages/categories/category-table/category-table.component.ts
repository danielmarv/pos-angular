import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '@core/models/Category';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
})
export class CategoryTableComponent {
  @Input() data: Category[] = [];

  @Output() opened = new EventEmitter<Category>();

  displayedColumns: string[] = ['id', 'name', 'icon'];
}
