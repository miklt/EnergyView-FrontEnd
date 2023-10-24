import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { DailyConsumptionData } from '../../interfaces/daily-consumption-data';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-relatorio-de-consumo-diario',
  templateUrl: './relatorio-de-consumo-diario.component.html',
  styleUrls: ['./relatorio-de-consumo-diario.component.scss']
})
export class RelatorioDeConsumoDiarioComponent implements OnInit {
  data: DailyConsumptionData | null = null;
  loading: boolean = true;
  date: FormControl<Date|null> = new FormControl<Date>(new Date()); // Initialize date with today's date
  maxDate: Date = new Date(); // Initialize maxDate with today's date
  isMobile: boolean = false;

  constructor(private dataService: DataService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.onDateSelect();
    this.updateSizes();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateSizes();
  }

  updateSizes(): void {
    const screenWidth = window.innerWidth;

    if (screenWidth < 800) {
      this.isMobile = true;
    }
    else {
      this.isMobile = false;
    }

    const titleContainer = document.getElementById('dailyConsumptionTitleContainer');
    const titleWrapper = document.getElementById('dailyConsumptionTitleWrapper');
    const datePicker = document.getElementById('dailyConsumptionDatePicker');

    if (!titleContainer || !datePicker || !titleWrapper) {
      throw new Error('One of the following HTMLElements does not exist: dailyConsumptionTitleContainer, dailyConsumptionTitleWrapper, dailyConsumptionDatePicker.');
    }

    // Update the title and date picker according to the title's container size, not screen
    if (titleContainer.clientWidth <= 600) {
      datePicker.classList.add('wide');
      titleWrapper.classList.add('wide');
    } 
    else {
      datePicker.classList.remove('wide');
      titleWrapper.classList.remove('wide');
    }
  }
  
  onDateSelect(): void {
    const dateRawValue = this.date.getRawValue();

    if (!dateRawValue) {
      throw new Error('dateRawValue does not exist.');
    }

    const day = dateRawValue.getDate();
    const month = dateRawValue.getMonth() + 1; // Month goes from 0 to 11
    const year = dateRawValue.getFullYear();

    // Pad the date components so that dateString is always YYYY-MM-DD
    const dateString = String(year) + '-' + String(month).padStart(2, '0') + '-' + String(day).padStart(2, '0');

    this.getData(dateString); 
  }
    
  getData(dateString: string): void {
    // Set loading to true while we don't get a response
    this.loading = true;

    this.dataService.getDailyConsumptionData(dateString).subscribe({
      next: (response) => {
        this.data = response;

        // Use DomSanitizer to explicitly tell Angular the HTML is trusted
        this.data['consumo-acumulado'] = this.sanitizer.bypassSecurityTrustHtml(String(this.data['consumo-acumulado']));
        this.data['curva-de-carga'] = this.sanitizer.bypassSecurityTrustHtml(String(this.data['curva-de-carga']));

        this.loading = false;

        this.executeChartsScripts();
      },
      error: () => {
        this.data = null;
        this.loading = false;
      }
    });
  }

  executeChartsScripts(): void {
    // Use setTimeout to wait for the view to finish loading
    setTimeout(() => {
      const consumoAcumuladoChart = document.getElementById('chartConsumoAcumulado');
      const curvaDeCargaChart = document.getElementById('chartCurvaDeCarga');

      if (!consumoAcumuladoChart || !curvaDeCargaChart) {
        throw new Error('One of the following HTMLElements does not exist: chartConsumoAcumulado, chartCurvaDeCarga.');
      }

      // Get all script elements within the consumoAcumuladoChart and curvaDeCargaChart HTMLElements
      const consumoAcumuladoChartScripts = consumoAcumuladoChart.getElementsByTagName('script');
      const curvaDeCargaChartScripts = curvaDeCargaChart.getElementsByTagName('script');

      // Loop through each script element executing them for both of the HTMLElements
      for (let i = 0; i < consumoAcumuladoChartScripts.length; i++) {
        const scriptFunction = new Function(String(consumoAcumuladoChartScripts[i].textContent));
        scriptFunction();
      }

      for (let i = 0; i < curvaDeCargaChartScripts.length; i++) {
        const scriptFunction = new Function(String(curvaDeCargaChartScripts[i].textContent));
        scriptFunction();
      }
    });
  }
}
