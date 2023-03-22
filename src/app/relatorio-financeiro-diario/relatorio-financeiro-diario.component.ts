import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-relatorio-financeiro-diario',
  templateUrl: './relatorio-financeiro-diario.component.html',
  styleUrls: ['./relatorio-financeiro-diario.component.css']
})
export class RelatorioFinanceiroDiarioComponent {
  date = new FormControl(new Date());
}
