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

  // 
  // closeSideNavIfOnMobile
  // 

  it('should emit the closeSideNavEvent', () => {
    spyOn(component.closeSideNavEvent, 'emit');

    component.isMobile = true;
    component.closeSideNavIfOnMobile();

    expect(component.closeSideNavEvent.emit).toHaveBeenCalledWith();
  });

  // 
  // downloadData
  // 

  it('should show an alert with the message "Em desenvolvimento."', () => {
    const alertSpy = spyOn(window, 'alert');

    component.downloadData();

    expect(alertSpy).toHaveBeenCalledWith('Em desenvolvimento.');
  });
});
