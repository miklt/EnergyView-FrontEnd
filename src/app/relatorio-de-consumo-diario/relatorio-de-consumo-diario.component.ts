import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiConsumptionService } from '../services/ApiConsumptionService';

@Component({
  selector: 'app-relatorio-de-consumo-diario',
  templateUrl: './relatorio-de-consumo-diario.component.html',
  styleUrls: ['./relatorio-de-consumo-diario.component.css']
})
export class RelatorioDeConsumoDiarioComponent{
  date = new FormControl(new Date());
  
  ngOnInit(){
    var day = this.date.getRawValue()?.getDate();
    var month = this.date.getRawValue()?.getMonth();
    var year = this.date.getRawValue()?.getFullYear();
    var dateString = year + "/" + month + "/" + day;
    console.log(dateString);
  }
  
  onDateChange(event: any): void {
    var day = event.getDate();
    var month = event.getMonth();
    var year = event.getFullYear();
    var dateString = year + "/" + month + "/" + day;
    console.log(dateString);
  }

  isDate(value: any): value is Date {
    return value instanceof Date;
  }
    
  chart1 : any;
  chart2 : any;
  response : any;
  constructor(private apiClient : ApiConsumptionService){

  }

  //This event should be linked to the "onclick" or the "onchange" event from the calendar
  //Or a better solution could be link this function into a button, but somebody has to add a button into the front-end
  getChartsViaEvent(){
    //I really don't know how to convert from FormControl to a pure Date Datatype
    //So, this work will be yours 😳
    //this.date.value?.toDateString()
    const fecha = new Date();
    this.response = this.apiClient.getChartsConsumoDiario(fecha);

    //This properties: Chart1 and Chart2, should be setted in the innerHTML properties from front-end components
    //Chart1 into the component with the id: chartCurvaCarga
    this.chart1 = this.response['curva-de-carga'];
    //Chart2 into the component with the id: chartConsumoAcumulado
    this.chart2 = this.response['consumo-acumulado'];

    //I guess that the api service here will return an array-dictionary
    //If not, instead of 'curva-de-carga' put 0 and for 'consumo-acumulado' put 1 on the index

    //If this still doesn't work, trying access to the response as an object property
  }

}
