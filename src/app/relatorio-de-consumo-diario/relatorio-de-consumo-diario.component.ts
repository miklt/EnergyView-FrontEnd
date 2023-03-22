import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-relatorio-de-consumo-diario',
  templateUrl: './relatorio-de-consumo-diario.component.html',
  styleUrls: ['./relatorio-de-consumo-diario.component.css']
})
export class RelatorioDeConsumoDiarioComponent{
  date = new FormControl(new Date());
}
