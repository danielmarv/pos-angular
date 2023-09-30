import {
  AfterContentChecked,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-categories-chart',
  templateUrl: './categories-chart.component.html',
  styleUrls: ['./categories-chart.component.scss'],
})
export class CategoriesChartComponent implements AfterContentChecked {
  @ViewChild('chartContainer') chartContainer?: ElementRef;
  offsetWidthContainer = 200;

  @Input() data: { name: string; value: number }[] = [];

  categoriesChartOpts = {
    view: [700, 400],
    animations: true,
    showXAxis: true,
    showYAxis: true,
    showXAxisLabel: false,
    showYAxisLabel: false,
    showLegend: false,
    showLabels: false,
    isDoughnut: false,
    legendPosition: LegendPosition.Below,
    gradient: false,
    barPadding: 20,
    showGridLines: false,
    // colorScheme: ['#C2EAFD', '#9ADDFB', '#72CFF9', '#54C5F8', '#385245'],
    colorScheme: 'air',
    onSelect(event: any): void {
      console.log(event);
    },
    onActivate(event: any): void {
      console.log(event);
    },
    onDeactivate(event: any): void {
      console.log(event);
    },
  };

  ngAfterContentChecked(): void {
    this.offsetWidthContainer = this.chartContainer?.nativeElement.offsetWidth;
  }
}
