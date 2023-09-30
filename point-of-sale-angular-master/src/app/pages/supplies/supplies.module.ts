import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuppliesComponent } from './all-supplies/supplies.component';
import { RouterModule, Routes } from '@angular/router';
import { SuppliesTableComponent } from './supplies-table/supplies-table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SuppliesSearchFormComponent } from './supplies-search-form/supplies-search-form.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddSupplyComponent } from './add-supply/add-supply.component';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

const routes: Routes = [
  { path: '', component: SuppliesComponent },
  { path: 'add', component: AddSupplyComponent },
  { path: 'add/:productId', component: AddSupplyComponent },
];

@NgModule({
  declarations: [
    SuppliesComponent,
    SuppliesTableComponent,
    SuppliesSearchFormComponent,
    AddSupplyComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  exports: [RouterModule],
})
export class SuppliesModule {}
