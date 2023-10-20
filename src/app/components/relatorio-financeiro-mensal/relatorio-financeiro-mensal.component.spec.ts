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

  it('should call updateSizes when window is resized', () => {
    // Spy to check if it's called
    spyOn(component, 'updateSizes');
    // Dispatch resize event
    window.dispatchEvent(new Event('resize'));
    // Check if updateSizes was called
    expect(component.updateSizes).toHaveBeenCalled();
  });

  it('should update sizes for responsiveness when titleContainer width > 600px', () => {
    const titleWrapper = document.getElementById('financialReportTitleWrapper');
    const datePicker = document.getElementById('financialReportDatePicker');
    // Set the viewport size
    viewport.set('desktop');
    // Call the updateSizes method
    component.updateSizes();
    // Expectations
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
    // Set the viewport size
    viewport.set('mobile');
    // Call the updateSizes method
    component.updateSizes();
    // Advance the virtual clock to allow asynchronous operations to complete
    // Expectations
    if (datePicker && titleWrapper) {
      expect(datePicker.classList.contains('wide')).toBeTruthy();
      expect(titleWrapper.classList.contains('wide')).toBeTruthy();
      expect(component.isMobile).toBeTruthy();
    }
    else {
      fail('datePicker and titleWrapper are not defined');
    }
  });

  it('should set the month and year correctly', () => {
    // Create a moment object to represent the normalizedMonthAndYear
    const normalizedMonthAndYear = moment({ month: 5, year: 2023 });
    // Create a moment object to represent the initial date value
    const initialDateValue = moment({ month: 2, year: 2022 });
    // Set the initial date value in your component
    component.date.setValue(initialDateValue);
    // Call the setMonthAndYear function
    component.setMonthAndYear(normalizedMonthAndYear, datepicker);
    // Expectations
    // Check if component.date.value is defined before accessing its properties
    if (component.date.value) {
      expect(component.date.value.month()).toEqual(normalizedMonthAndYear.month());
      expect(component.date.value.year()).toEqual(normalizedMonthAndYear.year());
    }
    else {
      fail('Date value is not defined');
    }
    expect(datepicker.close).toHaveBeenCalled();
  });
});
