import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavComponent } from './side-nav.component';

describe('SideBarComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNavComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the closeSideNavEvent', () => {
    // Create a spy on the EventEmitter
    spyOn(component.closeSideNavEvent, 'emit');

    // Call the closeSideNav function
    component.isMobile = true;
    component.closeSideNav();

    // Expect that the emit method of the EventEmitter was called with no arguments
    expect(component.closeSideNavEvent.emit).toHaveBeenCalledWith();
  });

  it('should show an alert with the message "Em desenvolvimento."', () => {
    // Mock the window.alert function using spyOn.
    const alertSpy = spyOn(window, 'alert');

    // Call the downloadData method to trigger the alert.
    component.downloadData();

    // Expect that window.alert was called with the expected message.
    expect(alertSpy).toHaveBeenCalledWith('Em desenvolvimento.');
  });
});
