// General
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import '@angular/common/locales/global/pt-PT';
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
// Components
import { SideBarComponent } from './side-bar/side-bar.component';
import { RelatorioDeConsumoDiarioComponent } from './relatorio-de-consumo-diario/relatorio-de-consumo-diario.component';
import { RelatorioDeConsumoMensalComponent } from './relatorio-de-consumo-mensal/relatorio-de-consumo-mensal.component';
import { RelatorioFinanceiroMensalComponent } from './relatorio-financeiro-mensal/relatorio-financeiro-mensal.component';
import { NoDataComponent } from './no-data/no-data.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    RelatorioDeConsumoDiarioComponent,
    RelatorioDeConsumoMensalComponent,
    RelatorioFinanceiroMensalComponent,
    NoDataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt-PT'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}