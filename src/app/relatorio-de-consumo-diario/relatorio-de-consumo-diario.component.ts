import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-relatorio-de-consumo-diario',
  templateUrl: './relatorio-de-consumo-diario.component.html',
  styleUrls: ['./relatorio-de-consumo-diario.component.css']
})
export class RelatorioDeConsumoDiarioComponent implements OnInit{
  data : any = null;
  date : FormControl<Date|null> = new FormControl<Date>(new Date()); // Initializes date with today's date
  maxDate : Date = new Date();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.onDateSelect();
  }
  
  // Updates data with the selected date
  onDateSelect(): void{
    // Separates the date in day, month and year to make a formatted YYYY-MM-DD string
    const day = this.date.getRawValue()!.getDate();
    const month = this.date.getRawValue()!.getMonth() + 1; // For some reason month goes from 0 to 11
    const year = this.date.getRawValue()!.getFullYear();
    const dateString = this.formatDateString(year, month, day);
    this.getData(dateString); // Uses the aforementioned dateString to get the data for the view
  }

  // Handles the date so that dateString is always YYYY-MM-DD
  formatDateString(year: number, month: number, day: number): string {
    const pad = (n: number) => (n < 10 ? '0' + n : n.toString()); // Adds a 0 before the number if n is < 10
    return `${year}-${pad(month)}-${pad(day)}`;
  }
    
  // Gets the data for the view using the dataService
  getData(dateString: string): void {
    this.dataService.getDailyConsumptionData(dateString).subscribe({
      next: (response) => {
        this.data = response;
        setTimeout(() => { // Uses setTimeout with no delay to wait for the view to render
          const consumo_acumulado = document.getElementById('chartConsumoAcumulado');
          const curva_carga = document.getElementById('chartCurvaDeCarga');
          if (consumo_acumulado && curva_carga) {
            // Sets the chart's html and calls executeScripts for each element
            consumo_acumulado.innerHTML = this.data['consumo-acumulado'];
            this.executeScripts(consumo_acumulado);
            curva_carga.innerHTML = this.data['curva-de-carga']
            this.executeScripts(curva_carga);
          }
        }, 0);
      },
      error: () => {
        this.data = null;
      }
    });
  }

  // Execute the chart's scripts
  executeScripts(element: HTMLElement): void {
    // Get all script elements within the provided HTMLElement
    let scriptTags = element.getElementsByTagName('script');
    
    // Loop through each script element
    for (let i = 0; i < scriptTags.length; i++) {
      // Get the content of the current script element
      const scriptContent = scriptTags[i].textContent;
      if (scriptContent) {
        try {
          const scriptFunction = new Function(scriptContent); // Create a new function from the script content
          scriptFunction(); // Execute the newly created script function
        } 
        catch (error) {
          console.error(`Error executing the chart's script: ${error}`);
        }
      }
    }
  }
}