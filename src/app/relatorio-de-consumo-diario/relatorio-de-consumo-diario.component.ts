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
  service;

  chart1 : any;
  chart2 : any;
  response : any;

  constructor(private apiClient : ApiConsumptionService){
    this.service = apiClient;
  }
  
  ngOnInit(){
    var day = this.date.getRawValue()!.getDate();
    var month = this.date.getRawValue()!.getMonth();
    month += 1;
    var year = this.date.getRawValue()!.getFullYear();
    if(day <= 9 && month <= 9){
      var dateString = year + "-" + "0" + month + "-" + "0" + day;
    }
    else if(day <= 9){
      var dateString = year + "-" + month + "-" + "0" + day;
    }
    else if(month <= 9){
      var dateString = year + "-" + "0" + month + "-" + day;
    }
    else{
      var dateString = year + "-" + month + "-" + day;
    }
    console.log(dateString);
  }
  
  onDateChange(event: any): void {
    var day = event.getDate();
    var month = event.getMonth();
    month += 1;
    var year = event.getFullYear();
    if(day <= 9 && month <= 9){
      var dateString = year + "-" + "0" + month + "-" + "0" + day;
    }
    else if(day <= 9){
      var dateString = year + "-" + month + "-" + "0" + day;
    }
    else if(month <= 9){
      var dateString = year + "-" + "0" + month + "-" + day;
    }
    else{
      var dateString = year + "-" + month + "-" + day;
    }
    console.log(dateString);
    this.service.getChartsConsumoDiario(dateString)
  }
    
  getChartsViaEvent(dateString: string){
    this.response = this.apiClient.getChartsConsumoDiario(dateString);

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
