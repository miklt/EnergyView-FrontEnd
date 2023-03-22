import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioFinanceiroDiarioComponent } from './relatorio-financeiro-diario.component';

describe('RelatorioFinanceiroDiarioComponent', () => {
  let component: RelatorioFinanceiroDiarioComponent;
  let fixture: ComponentFixture<RelatorioFinanceiroDiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioFinanceiroDiarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioFinanceiroDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
