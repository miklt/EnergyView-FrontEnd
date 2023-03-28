import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '../services/ApiService';

@Component({
  selector: 'app-relatorio-financeiro-diario',
  templateUrl: './relatorio-financeiro-diario.component.html',
  styleUrls: ['./relatorio-financeiro-diario.component.css']
})
export class RelatorioFinanceiroDiarioComponent {
  response : any = {} as any;
  date = new FormControl(new Date());
  maxDate = new Date();
  theresResponse : number = 1;
  progressBarValue : number = 100;

  constructor(private apiClient : ApiService){
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

    //Loads the progress bar
    this.loadProgressBar();
  }
  
  async getData(dateString: string){
    //Gets the response using the ApiService
    this.response = await this.apiClient.getResponse(dateString, "financeiro");
    if(Object.keys(this.response).length === 0){
      this.theresResponse = 0;
      return;
    }
    else this.theresResponse = 1;

    setTimeout(() => { //Waits for 5ms to make sure the ngIf has changed the view
      //Sets the chart's divs innerHTML
      let serie_historica = document.getElementById("chartSerieHistorica");

      serie_historica!.innerHTML = this.response["serie-historica"];

      let scriptTags = serie_historica!.getElementsByTagName('script');
      for (let i = 0; i < scriptTags.length; i++) {
        eval(scriptTags[i].innerHTML);
      }
    }, 5);
  }

  loadProgressBar(){
    this.progressBarValue = 0;
    setTimeout(() => {this.progressBarValue = 99;}, 1);
    setTimeout(() => {this.progressBarValue = 100;}, 500);
  }
}