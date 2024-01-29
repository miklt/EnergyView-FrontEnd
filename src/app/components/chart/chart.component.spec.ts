import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartComponent]
    });
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //
  // ngAfterViewInit
  //

  it('should call executeScripts in ngAfterViewInit', () => {
    spyOn(component, 'executeScripts');
    component.ngAfterViewInit();
    expect(component.executeScripts).toHaveBeenCalled();
  });

  //
  // executeScripts
  //

  it('should execute the scripts', () => {
    // Create test element to be modified by the script
    const testElement = document.createElement('div');
    testElement.id = 'test-element';
    document.body.appendChild(testElement);

    // Mock a script element
    const scriptElement = document.createElement('script');
    scriptElement.textContent = 'document.getElementById("test-element").textContent = "Script executed";';
    document.body.appendChild(scriptElement);
    
    component.executeScripts();
    
    expect(testElement.textContent).toBe('Script executed');
  });
});
