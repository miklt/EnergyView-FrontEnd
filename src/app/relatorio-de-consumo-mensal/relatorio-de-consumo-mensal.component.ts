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
    this.updateDatePickerWidth();
    this.onDateSelect();
  }

  // Listens to the resizing of the window
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.updateDatePickerWidth();
  }

  // Updates the date picker's width for responsiveness
  updateDatePickerWidth(): void {
    const titleContainer = this.elementRef.nativeElement.querySelector('.title-container');
    const datePicker = this.elementRef.nativeElement.querySelector('.date-picker');
    // Checks if the title container's width is less than or equal to 600px
    if (titleContainer.clientWidth <= 600) {
      datePicker.style.width = '100%';
    } 
    else {
      datePicker.style.removeProperty('width');
    }
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>): void {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  onDateSelect(): void {
    // Separates the date in day, month and year to make a formatted string
    const month = this.date.getRawValue()!.toDate().getMonth() + 1; // For some reason month goes from 0 to 11
    const year = this.date.getRawValue()!.toDate().getFullYear();
    const dateString = this.formatDateString(year, month);
    // this.getData(dateString); // Uses the aforementioned dateString to get the data for the view
  }

  // Handles the date so that dateString is always YYYY-MM
  formatDateString(year: number, month: number): string {
    const pad = (n: number) => (n < 10 ? '0' + n : n.toString()); // Adds a 0 before the number if n is < 10
    return `${year}-${pad(month)}`;
  }
}