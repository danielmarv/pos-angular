import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { fadeIn } from '@app/animations/fadeIn.animation';
import { Category } from '@core/models/Category';
import { CategoryService } from '@core/services/category.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CategoryTableComponent } from './category-table/category-table.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  animations: [fadeIn],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    CategoryTableComponent,
  ],
})
export class CategoriesComponent {
  categories$: Observable<Category[]> = this.categories.all();

  constructor(private categories: CategoryService, public dialog: MatDialog) {}

  async addCategory(): Promise<void> {
    const { CategoryFormComponent } = await import(
      './category-form/category-form.component'
    );

    const dialogRef = this.dialog.open(CategoryFormComponent, {
      data: {
        type: 'add',
        shift: null,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === '') {
        return;
      }
      this.categories
        .create(result)
        .pipe(take(1))
        .subscribe(_ => this.refresh());
    });
  }

  async editCategory(category: Category): Promise<void> {
    const { CategoryFormComponent } = await import(
      './category-form/category-form.component'
    );

    const dialogRef = this.dialog.open(CategoryFormComponent, {
      data: {
        type: 'edit',
        category,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === '') {
        return;
      }
      this.categories
        .update(category.id, result)
        .pipe(take(1))
        .subscribe(_ => this.refresh());
    });
  }

  refresh(): void {
    this.categories$ = this.categories.all();
  }
}
