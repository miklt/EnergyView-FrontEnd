import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RelatorioDeConsumoDiarioComponent } from './components/relatorio-de-consumo-diario/relatorio-de-consumo-diario.component';
import { RelatorioDeConsumoMensalComponent } from './components/relatorio-de-consumo-mensal/relatorio-de-consumo-mensal.component';
import { RelatorioFinanceiroMensalComponent } from './components/relatorio-financeiro-mensal/relatorio-financeiro-mensal.component';

const routes : Routes = [
  {path: '', redirectTo: '/relatorio-de-consumo/diario', pathMatch: 'full'},
  {path: 'relatorio-de-consumo', children: [
    {path: '', redirectTo: 'diario', pathMatch: 'full'},
    {path: 'diario', component: RelatorioDeConsumoDiarioComponent},
    {path: 'mensal', component: RelatorioDeConsumoMensalComponent}
  ]},
  {path: 'relatorio-financeiro', component: RelatorioFinanceiroMensalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
