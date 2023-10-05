import { Component, ViewEncapsulation, OnInit, ElementRef, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { default as _rollupMoment, Moment } from 'moment';

const moment = _rollupMoment;

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
export class RelatorioDeConsumoMensalComponent implements OnInit {
  date: FormControl<Moment|null> = new FormControl(moment());
  maxDate: Moment = moment();

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
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
    const titleContainer = document.getElementById('monthlyConsumptionTitleContainer');
    const titleWrapper = document.getElementById('monthlyConsumptionTitleWrapper');
    const datePicker = document.getElementById('monthlyConsumptionDatePicker');
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
}
