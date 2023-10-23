import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import moment, { Moment } from 'moment';
import { Viewport } from 'karma-viewport/dist/adapter/viewport';
import { NoDataComponent } from '../no-data/no-data.component';
import { RelatorioFinanceiroMensalComponent } from './relatorio-financeiro-mensal.component';

declare const viewport: Viewport;

describe('RelatorioFinanceiroMensalComponent', () => {
  let component: RelatorioFinanceiroMensalComponent;
  let fixture: ComponentFixture<RelatorioFinanceiroMensalComponent>;
  let datepicker: jasmine.SpyObj<MatDatepicker<Moment>>;

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
        RelatorioFinanceiroMensalComponent,
        NoDataComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RelatorioFinanceiroMensalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    datepicker = jasmine.createSpyObj<MatDatepicker<Moment>>(['close']);
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
    // Simulate the absence of elements by setting them to null
    spyOn(document, 'getElementById').and.returnValue(null);
  
    try {
      component.updateSizes();
      fail('Expected an error to be thrown.');
    }
    catch (error) {
      expect((error as Error).message).toBe('One of the following HTMLElements does not exist: financialReportTitleContainer, financialReportTitleWrapper, financialReportDatePicker.');
    }
  });

  it('should update sizes for responsiveness when titleContainer width > 600px', () => {
    const titleWrapper = document.getElementById('financialReportTitleWrapper');
    const datePicker = document.getElementById('financialReportDatePicker');

    viewport.set('desktop');

    component.updateSizes();

    if (datePicker && titleWrapper) {
      expect(datePicker.classList.contains('wide')).toBeFalsy();
      expect(titleWrapper.classList.contains('wide')).toBeFalsy();
      expect(component.isMobile).toBeFalsy();
    }
    else {
      fail('datePicker and titleWrapper are not defined');
    }
  });

  it('should update sizes for responsiveness when titleContainer width <= 600px', () => {
    const titleWrapper = document.getElementById('financialReportTitleWrapper');
    const datePicker = document.getElementById('financialReportDatePicker');

    viewport.set('mobile');

    component.updateSizes();
  
    if (datePicker && titleWrapper) {
      expect(datePicker.classList.contains('wide')).toBeTruthy();
      expect(titleWrapper.classList.contains('wide')).toBeTruthy();
      expect(component.isMobile).toBeTruthy();
    }
    else {
      fail('datePicker and titleWrapper are not defined');
    }
  });

  // 
  // setDateFormControl
  // 

  it('should set the month and year correctly', () => {
    const inputMoment = moment({ month: 5, year: 2023 });
    const initialDateValue = moment({ month: 2, year: 2022 });

    component.date.setValue(initialDateValue);

    component.setDateFormControl(inputMoment, datepicker);

    if (component.date.value) {
      expect(component.date.value.month()).toEqual(inputMoment.month());
      expect(component.date.value.year()).toEqual(inputMoment.year());
    }
    else {
      fail('Date value is not defined');
    }
    expect(datepicker.close).toHaveBeenCalled();
  });
});
