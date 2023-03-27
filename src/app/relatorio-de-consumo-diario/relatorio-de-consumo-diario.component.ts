import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '../services/ApiService';

@Component({
  selector: 'app-relatorio-de-consumo-diario',
  templateUrl: './relatorio-de-consumo-diario.component.html',
  styleUrls: ['./relatorio-de-consumo-diario.component.css']
})
export class RelatorioDeConsumoDiarioComponent{
  response : any;
  consumo_relativo_a : any;
  consumo_relativo_b : any;
  consumo_relativo_c : any;
  date = new FormControl(new Date());

  constructor(private apiClient : ApiService){}
  
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
    this.getData(dateString);
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
    this.getData(dateString);
  }
    
  async getData(dateString: string){
    this.response = await this.apiClient.getResponse(dateString, "consumo");
    
    let curva_carga = document.getElementById("chartCurvaCarga");
    let consumo_acumulado = document.getElementById("chartConsumoAcumuladoDiario");
    
    //I don't think we should be handling data in the front-end, this should probably be created in the back-end and returned in the response array
    this.consumo_relativo_a = (this.response['consumo-total-a'] / this.response['consumo-total'] * 100).toFixed(2)
    this.consumo_relativo_b = (this.response['consumo-total-b'] / this.response['consumo-total'] * 100).toFixed(2)
    this.consumo_relativo_c = (this.response['consumo-total-c'] / this.response['consumo-total'] * 100).toFixed(2)
    if(curva_carga && consumo_acumulado){
      curva_carga.innerHTML = this.response["curva-de-carga"]
      consumo_acumulado.innerHTML = this.response["consumo-acumulado"]
      let scriptTags = curva_carga.getElementsByTagName('script');
      for (let i = 0; i < scriptTags.length; i++) {
        eval(scriptTags[i].innerHTML);
      }
      scriptTags = consumo_acumulado.getElementsByTagName('script');
      for (let i = 0; i < scriptTags.length; i++) {
        eval(scriptTags[i].innerHTML);
      }
    }
  }
}