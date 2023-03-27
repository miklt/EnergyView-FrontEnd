import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '../services/ApiService';

@Component({
  selector: 'app-relatorio-financeiro-diario',
  templateUrl: './relatorio-financeiro-diario.component.html',
  styleUrls: ['./relatorio-financeiro-diario.component.css']
})
export class RelatorioFinanceiroDiarioComponent {
  date = new FormControl(new Date());
  maxDate = new Date();
  minDate = new Date();

  constructor(private apiClient : ApiService){
    this.minDate = this.apiClient.minDate;
    var day = this.date.getRawValue()!.getDate();
    var month = this.date.getRawValue()!.getMonth() + 1;
    var year = this.date.getRawValue()!.getFullYear();
    if(day <= 9 && month <= 9) dateString = year + "-" + "0" + month + "-" + "0" + day;
    else if(day <= 9) var dateString = year + "-" + month + "-" + "0" + day;
    else if(month <= 9) var dateString = year + "-" + "0" + month + "-" + day;
    else var dateString = year + "-" + month + "-" + day;
  }
  
  onDateChange(event: any){
    var day = event.getDate();
    var month = event.getMonth() + 1;
    var year = event.getFullYear();
    if(day <= 9 && month <= 9) dateString = year + "-" + "0" + month + "-" + "0" + day;
    else if(day <= 9) var dateString = year + "-" + month + "-" + "0" + day;
    else if(month <= 9) var dateString = year + "-" + "0" + month + "-" + day;
    else var dateString = year + "-" + month + "-" + day;
  }
}