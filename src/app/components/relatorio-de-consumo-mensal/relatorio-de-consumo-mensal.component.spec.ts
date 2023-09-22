import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RelatorioDeConsumoMensalComponent } from './relatorio-de-consumo-mensal.component';
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

declare const viewport: Viewport;

describe('RelatorioDeConsumoMensalComponent', () => {
  let component: RelatorioDeConsumoMensalComponent;
  let fixture: ComponentFixture<RelatorioDeConsumoMensalComponent>;
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
        RelatorioDeConsumoMensalComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RelatorioDeConsumoMensalComponent);
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
    // Create mock elements
    const datePicker = document.getElementById('datePicker');
    const consumptionTitleContainer = document.getElementById('consumptionTitleContainer');
    // Set the viewport size
    viewport.set('desktop');
    // Call the updateSizes method
    component.updateSizes();
    // Expectations
    if (datePicker && consumptionTitleContainer) {
      expect(datePicker.style.width).toBe('');
      expect(consumptionTitleContainer.style.justifyContent).toBe('flex-start');
    }
    else {
      fail('datePicker and consumptionTitleContainer are not defined');
    }
  });

  it('should update sizes for responsiveness when titleContainer width <= 600px', () => {
    // Create mock elements
    const datePicker = document.getElementById('datePicker');
    const consumptionTitleContainer = document.getElementById('consumptionTitleContainer');
    // Set the viewport size
    viewport.set('mobile');
    // Call the updateSizes method
    component.updateSizes();
    // Expectations
    if (datePicker && consumptionTitleContainer) {
      expect(datePicker.style.width).toBe('100%');
      expect(consumptionTitleContainer.style.justifyContent).toBe('space-between');
    }
    else {
      fail('datePicker and consumptionTitleContainer are not defined');
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

  it('should format date string correctly with 1 digit month', () => {
    // Calls the function with mocked data
    const formattedDate = component.formatDateString(2023, 9);
    // Expectation
    expect(formattedDate).toBe('2023-09');
  });

  it('should format date string correctly with 2 digit month', () => {
    // Calls the function with mocked data
    const formattedDate = component.formatDateString(2023, 10);
    // Expectation
    expect(formattedDate).toBe('2023-10');
  });
});
