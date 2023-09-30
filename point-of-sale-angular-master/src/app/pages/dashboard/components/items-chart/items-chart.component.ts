import {
  AfterContentChecked,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-items-chart',
  templateUrl: './items-chart.component.html',
  styleUrls: ['./items-chart.component.scss'],
})
export class ItemsChartComponent implements AfterContentChecked {
  @ViewChild('chartContainer') chartContainer?: ElementRef;
  offsetWidthContainer = 200;

  @Input() data: { id: number; name: string; value: number }[] = [];

  itemsChartOpts = {
    animations: true,
    showXAxis: true,
    showYAxis: true,
    showXAxisLabel: false,
    showYAxisLabel: false,
    showLegend: false,
    gradient: false,
    barPadding: 20,
    showGridLines: false,
    // colorScheme: ['#C2EAFD', '#9ADDFB', '#72CFF9', '#54C5F8', '#385245'],
    colorScheme: 'air',
    onSelect(event: any): void {
      console.log(event);
    },
  };

  ngAfterContentChecked(): void {
    this.offsetWidthContainer = this.chartContainer?.nativeElement.offsetWidth;
  }
}
