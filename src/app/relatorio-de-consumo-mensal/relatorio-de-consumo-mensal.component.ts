import {Component, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { ApiService } from '../services/ApiService';

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
  styleUrls: ['./relatorio-de-consumo-mensal.component.css'],
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

export class RelatorioDeConsumoMensalComponent {
  response : any = {} as any;
  date = new FormControl(moment());
  maxDate = moment();

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  constructor(private apiClient : ApiService){
    //Separates the date in day, month and year to make a formatted string
    var month = this.date.getRawValue()!.toDate().getMonth() + 1; //For some reason month goes from 0 to 11
    var year = this.date.getRawValue()!.toDate().getFullYear();

    //Handles the date so that dateString is always YYYY-MM
    if(month <= 9) var dateString = year + "-" + "0" + month;
    else var dateString = year + "-" + month;

    //Uses the aforementioned dateString to get the data for the view
    this.getData(dateString);
  }

  onDateChange(event: any){
    //Separates the date in day, month and year to make a formatted string
    var month = event.toDate().getMonth() + 1; //For some reason month goes from 0 to 11
    var year = event.toDate().getFullYear();

    //Handles the date so that dateString is always YYYY-MM
    if(month <= 9) var dateString = year + "-" + "0" + month;
    else var dateString = year + "-" + month;

    //Uses the aforementioned dateString to get the data for the view
    this.getData(dateString);
  }

  async getData(dateString: string){
    //Gets the response using the ApiService
    this.response = await this.apiClient.getResponse(dateString, "consumo");

    //Sets the chart's divs innerHTML
    let consumo_acumulado = document.getElementById("chartConsumoAcumulado");
    let curva_carga = document.getElementById("chartCurvaDeCarga");
    curva_carga!.innerHTML = this.response["curva-de-carga"];
    consumo_acumulado!.innerHTML = this.response["consumo-acumulado"];

    let scriptTags = curva_carga!.getElementsByTagName('script');
    for (let i = 0; i < scriptTags.length; i++) {
      eval(scriptTags[i].innerHTML);
    }

    scriptTags = consumo_acumulado!.getElementsByTagName('script');
    for (let i = 0; i < scriptTags.length; i++) {
      eval(scriptTags[i].innerHTML);
    }
  }
}