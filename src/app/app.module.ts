import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LOCALE_ID } from '@angular/core';
// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
// Other
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
// Components
import { SideBarComponent } from './side-bar/side-bar.component';
import { RelatorioDeConsumoDiarioComponent } from './relatorio-de-consumo-diario/relatorio-de-consumo-diario.component';
import { RelatorioDeConsumoMensalComponent } from './relatorio-de-consumo-mensal/relatorio-de-consumo-mensal.component';
import { RelatorioFinanceiroDiarioComponent } from './relatorio-financeiro-diario/relatorio-financeiro-diario.component';
import { RelatorioFinanceiroMensalComponent } from './relatorio-financeiro-mensal/relatorio-financeiro-mensal.component'; 


const appRoutes : Routes = [
  {path: '', redirectTo: '/relatorio-de-consumo/diario', pathMatch: 'full'},
  {path: 'relatorio-de-consumo', children: [
    {path: 'diario', component: RelatorioDeConsumoDiarioComponent},
    {path: 'mensal', component: RelatorioDeConsumoMensalComponent}
  ]},
  {path: 'relatorio-financeiro', children: [
    {path: 'diario', component: RelatorioFinanceiroDiarioComponent},
    {path: 'mensal', component: RelatorioFinanceiroMensalComponent}
  ]}
];

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    RelatorioDeConsumoDiarioComponent,
    RelatorioDeConsumoMensalComponent,
    RelatorioFinanceiroDiarioComponent,
    RelatorioFinanceiroMensalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDatepickerModule,
    RouterModule.forRoot(appRoutes),
    MatBadgeModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    LoadingBarRouterModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt-BR'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
