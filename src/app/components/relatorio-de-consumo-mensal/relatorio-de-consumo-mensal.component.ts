import { Component, ViewEncapsulation, OnInit, ElementRef, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-relatorio-de-consumo-mensal',
  templateUrl: './relatorio-de-consumo-mensal.component.html',
  styleUrls: ['./relatorio-de-consumo-mensal.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  encapsulation: ViewEncapsulation.None,
})
export class RelatorioDeConsumoMensalComponent implements OnInit{
  date: FormControl<Moment|null> = new FormControl(moment());
  maxDate: Moment = moment();

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.onDateSelect();
    this.updateSizes();
  }

  // Listens to the resizing of the window
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.updateSizes();
  }

  // Updates the size of elements for responsiveness
  updateSizes() {
    // Updates title and date picker
    const titleContainer = this.elementRef.nativeElement.querySelector('.title-container');
    const datePicker = this.elementRef.nativeElement.querySelector('.date-picker');
    const consumptionTitleContainer = this.elementRef.nativeElement.querySelector('.consumption-title-container');
    // Checks if the title container's width is less than or equal to 600px
    if (titleContainer.clientWidth <= 600) {
      datePicker.style.width = '100%';
      consumptionTitleContainer.style.justifyContent = 'space-between';
    } 
    else {
      datePicker.style.removeProperty('width');
      consumptionTitleContainer.style.justifyContent = 'flex-start';
    }
  }

  // Sets the month and year of the MatDatepicker control to the provided values.
  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>): void {
  // Gets the current value of the MatDatepicker control
    const ctrlValue = this.date.value;
    if (ctrlValue) {
      // Sets the month and year to the ones of the normalizedMonthAndYear
      ctrlValue.month(normalizedMonthAndYear.month());
      ctrlValue.year(normalizedMonthAndYear.year());
      // Updates the value of the MatDatepicker control with the new month and year
      this.date.setValue(ctrlValue);
      // Closes the MatDatepicker after setting the new values
      datepicker.close();
    }
  }

  // Updates data with the selected date
  onDateSelect(): void{
    // const dateRawValue = this.date.getRawValue();
    // if (dateRawValue) {
    //   // Separates the date in day, month and year to make a formatted YYYY-MM-DD string
    //   const day = dateRawValue.getDate();
    //   const month = dateRawValue.getMonth() + 1; // For some reason month goes from 0 to 11
    //   const year = dateRawValue.getFullYear();
    //   const dateString = this.formatDateString(year, month, day);
    //   this.getData(dateString); // Uses the aforementioned dateString to get the data for the view
    // }
  }

  // Handles the date so that dateString is always YYYY-MM
  formatDateString(year: number, month: number): string {
    const pad = (n: number) => (n < 10 ? '0' + n : n.toString()); // Adds a 0 before the number if n is < 10
    return `${year}-${pad(month)}`;
  }
}