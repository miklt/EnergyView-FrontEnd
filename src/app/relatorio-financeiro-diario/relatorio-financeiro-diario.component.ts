import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-relatorio-financeiro-diario',
  templateUrl: './relatorio-financeiro-diario.component.html',
  styleUrls: ['./relatorio-financeiro-diario.component.css']
})
export class RelatorioFinanceiroDiarioComponent {
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
}
