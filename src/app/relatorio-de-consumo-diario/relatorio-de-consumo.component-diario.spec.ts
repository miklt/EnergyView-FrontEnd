import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioDeConsumoDiarioComponent } from './relatorio-de-consumo-diario.component';

describe('RelatorioDeConsumoDiarioComponent', () => {
  let component: RelatorioDeConsumoDiarioComponent;
  let fixture: ComponentFixture<RelatorioDeConsumoDiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioDeConsumoDiarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioDeConsumoDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});