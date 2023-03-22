import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioFinanceiroMensalComponent } from './relatorio-financeiro-mensal.component';

describe('RelatorioFinanceiroMensalComponent', () => {
  let component: RelatorioFinanceiroMensalComponent;
  let fixture: ComponentFixture<RelatorioFinanceiroMensalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioFinanceiroMensalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioFinanceiroMensalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
