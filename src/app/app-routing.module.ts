import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RelatorioDeConsumoDiarioComponent } from './pages/relatorio-de-consumo-diario/relatorio-de-consumo-diario.component';
import { RelatorioDeConsumoMensalComponent } from './pages/relatorio-de-consumo-mensal/relatorio-de-consumo-mensal.component';
import { RelatorioFinanceiroMensalComponent } from './pages/relatorio-financeiro-mensal/relatorio-financeiro-mensal.component';
import { SobreComponent } from './pages/sobre/sobre.component';

const routes : Routes = [
  {path: '', redirectTo: '/relatorio-de-consumo/diario', pathMatch: 'full'},
  {path: 'relatorio-de-consumo', children: [
    {path: '', redirectTo: 'diario', pathMatch: 'full'},
    {path: 'diario', component: RelatorioDeConsumoDiarioComponent},
    {path: 'mensal', component: RelatorioDeConsumoMensalComponent}
  ]},
  {path: 'relatorio-financeiro', component: RelatorioFinanceiroMensalComponent},
  {path: 'sobre', component: SobreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
