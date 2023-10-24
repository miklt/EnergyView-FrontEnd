import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RelatorioDeConsumoDiarioComponent } from './relatorio-de-consumo-diario.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { LoaderComponent } from '../loader/loader.component';
import { NoDataComponent } from '../no-data/no-data.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DataService } from 'src/app/services/data.service';
import { Observable, of } from 'rxjs';
import { Viewport } from 'karma-viewport/dist/adapter/viewport';
declare const viewport: Viewport;

describe('RelatorioDeConsumoDiarioComponent', () => {
  let service: DataService;
  let component: RelatorioDeConsumoDiarioComponent;
  let fixture: ComponentFixture<RelatorioDeConsumoDiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatFormFieldModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule
      ],
      declarations: [
        RelatorioDeConsumoDiarioComponent,
        LoaderComponent,
        NoDataComponent
      ],
      providers: [
        DataService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RelatorioDeConsumoDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(DataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // 
  // onResize
  // 

  it('should call updateSizes when window is resized', () => {
    spyOn(component, 'updateSizes');
    
    window.dispatchEvent(new Event('resize'));
    
    expect(component.updateSizes).toHaveBeenCalled();
  });

  // 
  // updateSizes
  // 

  it('should handle missing elements in updateSizes', () => {
    // Simulate the absence of elements
    spyOn(document, 'getElementById').and.returnValue(null);
  
    try {
      component.updateSizes();
      fail('Expected an error to be thrown.');
    }
    catch (error) {
      expect((error as Error).message).toBe('One of the following HTMLElements does not exist: dailyConsumptionTitleContainer, dailyConsumptionTitleWrapper, dailyConsumptionDatePicker.');
    }
  });
  

  it('should update sizes for responsiveness when titleContainer width > 600px', () => {
    // Create mock elements and append them to the HTML document
    const chartConsumoAcumulado = document.createElement('div');
    chartConsumoAcumulado.id = 'chartConsumoAcumulado';
    document.body.appendChild(chartConsumoAcumulado);

    const chartCurvaDeCarga = document.createElement('div');
    chartCurvaDeCarga.id = 'chartCurvaDeCarga';
    document.body.appendChild(chartCurvaDeCarga);

    const titleWrapper = document.getElementById('dailyConsumptionTitleWrapper');
    const datePicker = document.getElementById('dailyConsumptionDatePicker');

    viewport.set('desktop');

    component.updateSizes();

    if (datePicker && titleWrapper) {
      expect(datePicker.classList.contains('wide')).toBeFalsy();
      expect(titleWrapper.classList.contains('wide')).toBeFalsy();
    }
    else {
      fail('datePicker and titleWrapper are not defined');
    }
  });

  it('should update sizes for responsiveness when titleContainer width <= 600px', () => {
    // Create mock elements and append them to the HTML document
    const chartConsumoAcumulado = document.createElement('div');
    chartConsumoAcumulado.id = 'chartConsumoAcumulado';
    document.body.appendChild(chartConsumoAcumulado);

    const chartCurvaDeCarga = document.createElement('div');
    chartCurvaDeCarga.id = 'chartCurvaDeCarga';
    document.body.appendChild(chartCurvaDeCarga);

    const titleWrapper = document.getElementById('dailyConsumptionTitleWrapper');
    const datePicker = document.getElementById('dailyConsumptionDatePicker');

    viewport.set('mobile');

    component.updateSizes();
    
    if (datePicker && titleWrapper) {
      expect(datePicker.classList.contains('wide')).toBeTruthy();
      expect(titleWrapper.classList.contains('wide')).toBeTruthy();
    }
    else {
      fail('datePicker and titleWrapper are not defined');
    }
  });

  // 
  // onDateSelect
  // 

  it('should handle missing dateRawValue in onDateSelect', () => {
    // Simulate the absence of dateRawValue
    spyOn(component.date, 'getRawValue').and.returnValue(null);
  
    try {
      component.onDateSelect();
      fail('Expected an error to be thrown.');
    }
    catch (error) {
      expect((error as Error).message).toBe('dateRawValue does not exist.');
    }
  });

  it('should call getData with the formatted date when onDateSelect is called', () => {
    // Mock getRawValue's return
    spyOn(component.date, 'getRawValue').and.returnValue(new Date('2023-9-14'));

    spyOn(component, 'getData');
    
    component.onDateSelect();
    
    expect(component.getData).toHaveBeenCalledWith('2023-09-14');
  });

  // 
  // getDailyConsumptionData
  // 

  it('should load data', fakeAsync(() => {
    // Mock getDailyConsumptionData's return
    const responseData = {
      'consumo-acumulado': '<div>Consumo Acumulado Chart</div>',
      'curva-de-carga': '<div>Curva de Carga Chart</div>',
      'demanda-maxima': 0,
      'demanda-media': 0,
      'variacao-demanda-maxima': 0,
      'variacao-demanda-media': 0,
      'horario-de-pico': '',
      'horario-de-pico-ontem': '',
      'consumo-total': 0,
      'variacao-consumo-total': 0,
      'consumo-total-a': 0,
      'variacao-consumo-total-a': 0,
      'consumo-total-b': 0,
      'variacao-consumo-total-b': 0,
      'consumo-total-c': 0,
      'variacao-consumo-total-c': 0
    };
    spyOn(service, 'getDailyConsumptionData').and.returnValue(of(responseData));
    spyOn(component, 'executeChartsScripts');
    
    const dateString = '2023-09-14';
    component.getData(dateString);

    tick(); 

    expect(service.getDailyConsumptionData).toHaveBeenCalledWith(dateString);
    expect(component.data).toEqual(responseData);
    expect(component.loading).toBe(false);
    expect(component.executeChartsScripts).toHaveBeenCalled();
  }));

  it('should not load data', fakeAsync(() => {
    // Mock getDailyConsumptionData's return
    spyOn(service, 'getDailyConsumptionData').and.returnValue(
      new Observable((observer) => {
        observer.error(new Error('Some error occurred'));
      })
    );

    const dateString = '2023-09-14';
    component.getData(dateString);

    tick(); 

    expect(service.getDailyConsumptionData).toHaveBeenCalledWith(dateString);
    expect(component.data).toEqual(null);
    expect(component.loading).toBe(false);
  }));

  // 
  // executeChartsScripts
  // 

  it('should handle missing chart elements in executeChartsScripts', fakeAsync(() => {
    // Simulate the absence of elements
    spyOn(document, 'getElementById').and.returnValue(null);
  
    try {
      component.executeChartsScripts();

      tick();

      fail('Expected an error to be thrown.');
    }
    catch (error) {
      expect((error as Error).message).toBe('One of the following HTMLElements does not exist: chartConsumoAcumulado, chartCurvaDeCarga.');
    }
  }));

  it('should execute the scripts', fakeAsync(() => {
    // Create test elements to be modified by the scripts and append them to the HTML document
    const testElementConsumoAcumulado = document.createElement('div');
    testElementConsumoAcumulado.id = 'test-element-consumo-acumulado';
    const testElementCurvaDeCarga = document.createElement('div');
    testElementCurvaDeCarga.id = 'test-element-curva-de-carga';
    document.body.appendChild(testElementConsumoAcumulado);
    document.body.appendChild(testElementCurvaDeCarga);

    // Mock ConsumoAcumulado's content
    const chartConsumoAcumulado = document.getElementById('chartConsumoAcumulado');
    if (chartConsumoAcumulado) {
      const scriptElementConsumoAcumulado = document.createElement('script');
      scriptElementConsumoAcumulado.textContent = 'document.getElementById("test-element-consumo-acumulado").textContent = "Script executed";';
      chartConsumoAcumulado.appendChild(scriptElementConsumoAcumulado);
    }

    // Mock CurvaDeCarga's content
    const chartCurvaDeCarga = document.getElementById('chartCurvaDeCarga');
    if (chartCurvaDeCarga) {
      const scriptElementCurvaDeCarga = document.createElement('script');
      scriptElementCurvaDeCarga.textContent = 'document.getElementById("test-element-curva-de-carga").textContent = "Script executed";';
      chartCurvaDeCarga.appendChild(scriptElementCurvaDeCarga);
    }
    
    component.executeChartsScripts();

    tick();
    
    expect(testElementConsumoAcumulado.textContent).toBe('Script executed');
    expect(testElementConsumoAcumulado.textContent).toBe('Script executed');
  }));
});
