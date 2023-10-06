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
  date: FormControl<Date|null> = new FormControl<Date>(new Date()); // Initializes date with today's date
  maxDate: Date = new Date();

  constructor(private dataService: DataService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.onDateSelect();
    this.updateSizes();
  }

  // Listens to the resizing of the window
  @HostListener('window:resize')
  onResize(): void {
    this.updateSizes();
  }

  // Updates the size of elements for responsiveness
  updateSizes(): void {
    // Updates title and date picker
    const titleContainer = document.getElementById('dailyConsumptionTitleContainer');
    const titleWrapper = document.getElementById('dailyConsumptionTitleWrapper');
    const datePicker = document.getElementById('dailyConsumptionDatePicker');
    if (titleContainer && datePicker && titleWrapper) {
      // Checks if the title container's width is less than or equal to 600px
      if (titleContainer.clientWidth <= 600) {
        datePicker.classList.add('wide');
        titleWrapper.classList.add('wide');
      } 
      else {
        datePicker.classList.remove('wide');
        titleWrapper.classList.remove('wide');
      }
    }
    this.executeChartsScripts(100);
  }
  
  // Updates data with the selected date
  onDateSelect(): void {
    const dateRawValue = this.date.getRawValue();
    if (dateRawValue) {
      // Separates the date in day, month and year to make a formatted YYYY-MM-DD string
      const day = dateRawValue.getDate();
      const month = dateRawValue.getMonth() + 1; // For some reason month goes from 0 to 11
      const year = dateRawValue.getFullYear();
      // Handles the date so that dateString is always YYYY-MM-DD
      const dateString = String(year) + '-' + String(month).padStart(2, '0') + '-' + String(day).padStart(2, '0');
      this.getData(dateString); // Uses the aforementioned dateString to get the data for the view
    }
  }
    
  // Gets the data for the view using the dataService
  getData(dateString: string): void {
    this.loading = true;
    this.dataService.getDailyConsumptionData(dateString).subscribe({
      next: (response) => {
        this.data = response;
        // Use DomSanitizer to sanitize the HTML content
        this.data['consumo-acumulado'] = this.sanitizer.bypassSecurityTrustHtml(String(this.data['consumo-acumulado']));
        this.data['curva-de-carga'] = this.sanitizer.bypassSecurityTrustHtml(String(this.data['curva-de-carga']));
        // Loading is done
        this.loading = false;
        this.executeChartsScripts();
      },
      error: () => {
        this.data = null;
        this.loading = false;
      }
    });
  }

  // Executes the chart's scripts
  executeChartsScripts(delay: number = 0): void {
    setTimeout(() => { // Uses setTimeout to wait for the view to resize or finish loading
      const consumo_acumulado = document.getElementById('chartConsumoAcumulado');
      const curva_carga = document.getElementById('chartCurvaDeCarga');
      if (consumo_acumulado) {
        // Gets all script elements within the provided HTMLElement
        const scriptTags = consumo_acumulado.getElementsByTagName('script');
        // Loops through each script element
        for (let i = 0; i < scriptTags.length; i++) {
          const scriptFunction = new Function(String(scriptTags[i].textContent)); // Creates a new function from the script content
          scriptFunction(); // Executes the newly created script function
        }
      }
      if (curva_carga) {
        // Gets all script elements within the provided HTMLElement
        const scriptTags = curva_carga.getElementsByTagName('script');
        // Loops through each script element
        for (let i = 0; i < scriptTags.length; i++) {
          const scriptFunction = new Function(String(scriptTags[i].textContent)); // Creates a new function from the script content
          scriptFunction(); // Executes the newly created script function
        }
      }
    }, delay);
  }
}
