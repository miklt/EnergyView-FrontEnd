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
  date = new FormControl(new Date());
  maxDate = new Date();
  theresResponse : boolean = false;

  constructor(private dataService: DataService){}

  ngOnInit(): void {
    //Separates the date in day, month and year to make a formatted string
    var day = this.date.getRawValue()!.getDate();
    var month = this.date.getRawValue()!.getMonth() + 1; //For some reason month goes from 0 to 11
    var year = this.date.getRawValue()!.getFullYear();

    //Handles the date so that dateString is always YYYY-MM-DD
    if(day <= 9 && month <= 9) dateString = year + "-" + "0" + month + "-" + "0" + day;
    else if(day <= 9) var dateString = year + "-" + month + "-" + "0" + day;
    else if(month <= 9) var dateString = year + "-" + "0" + month + "-" + day;
    else var dateString = year + "-" + month + "-" + day;

    //Uses the aforementioned dateString to get the data for the view
    this.getData(dateString);
  }
  
  onDateChange(event: any){
    //Separates the date in day, month and year to make a formatted string
    var day = event.getDate();
    var month = event.getMonth() + 1; //For some reason month goes from 0 to 11
    var year = event.getFullYear();
    
    //Handles the date so that dateString is always YYYY-MM-DD
    if(day <= 9 && month <= 9) dateString = year + "-" + "0" + month + "-" + "0" + day;
    else if(day <= 9) var dateString = year + "-" + month + "-" + "0" + day;
    else if(month <= 9) var dateString = year + "-" + "0" + month + "-" + day;
    else var dateString = year + "-" + month + "-" + day;

    //Uses the aforementioned dateString to get the data for the view
    this.getData(dateString);
  }
    
  getData(dateString: string){
    //Gets the response using the dataService
    this.dataService.getDailyConsumptionData(dateString).subscribe((response) => {
      this.theresResponse = true;
      this.data = response;
      //Sets the chart's divs innerHTML
      setTimeout(() => { //Waits for 1ms to make sure the ngIf has changed the view
        let consumo_acumulado = document.getElementById("chartConsumoAcumulado");
        let curva_carga = document.getElementById("chartCurvaDeCarga");
        
        curva_carga!.innerHTML = this.data["curva-de-carga"];
        consumo_acumulado!.innerHTML = this.data["consumo-acumulado"];

        let scriptTags = curva_carga!.getElementsByTagName('script');
        for (let i = 0; i < scriptTags.length; i++) {
          eval(scriptTags[i].innerHTML);
        }

        scriptTags = consumo_acumulado!.getElementsByTagName('script');
        for (let i = 0; i < scriptTags.length; i++) {
          eval(scriptTags[i].innerHTML);
        }
      }, 1);
    }, () => {
      this.theresResponse = false;
      this.data = null;
    });
  }
}