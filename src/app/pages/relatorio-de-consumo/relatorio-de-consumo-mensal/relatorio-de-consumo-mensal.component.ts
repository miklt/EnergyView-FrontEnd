import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { default as _rollupMoment, Moment } from 'moment';

// Alias the Moment.js library as 'moment' for easier usage throughout the component.
const moment = _rollupMoment;

// Define custom date formats for parsing and displaying dates.
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY'
  },
  display: {
    dateInput: 'MM/YYYY'
  }
};

@Component({
  selector: 'app-relatorio-de-consumo-mensal',
  templateUrl: './relatorio-de-consumo-mensal.component.html',
  styleUrls: ['./relatorio-de-consumo-mensal.component.scss'],
  providers: [
    // Configure providers for date handling in the component.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS
    }
  ]
})
export class RelatorioDeConsumoMensalComponent implements OnInit {
  date: FormControl<Moment|null> = new FormControl(moment()); // Initialize date with today's date
  maxDate: Moment = moment(); // Initialize maxDate with today's date
  isMobile: boolean = false;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
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

    const titleContainer = document.getElementById('monthlyConsumptionTitleContainer');
    const titleWrapper = document.getElementById('monthlyConsumptionTitleWrapper');
    const datePicker = document.getElementById('monthlyConsumptionDatePicker');

    if (!titleContainer || !datePicker || !titleWrapper) {
      throw new Error('One of the following HTMLElements does not exist: monthlyConsumptionTitleContainer, monthlyConsumptionTitleWrapper, monthlyConsumptionDatePicker.');
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

  setDateFormControl(inputMoment: Moment, datepicker: MatDatepicker<Moment>): void {
    this.date.setValue(inputMoment);

    datepicker.close();
  }
}
