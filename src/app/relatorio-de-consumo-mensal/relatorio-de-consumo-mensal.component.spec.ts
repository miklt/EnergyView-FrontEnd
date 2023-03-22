import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioDeConsumoMensalComponent } from './relatorio-de-consumo-mensal.component';

describe('RelatorioDeConsumoMensalComponent', () => {
  let component: RelatorioDeConsumoMensalComponent;
  let fixture: ComponentFixture<RelatorioDeConsumoMensalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioDeConsumoMensalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioDeConsumoMensalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
