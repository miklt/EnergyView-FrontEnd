import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { Viewport } from 'karma-viewport/dist/adapter/viewport';

declare const viewport: Viewport;

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSidenavModule,
        BrowserAnimationsModule
      ],
      declarations: [
        AppComponent,
        SideNavComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have as title EnergyView', () => {
    expect(component.title).toEqual('EnergyView');
  });

  it('should update sidenav when window is resized to less than 800px', () => {
    viewport.set('mobile');
    component.sideNavMode = 'side';
    component.sideNavIsOpened = true;
    // Call the onResize function
    component.onResize();
    // Add your expectations here for the state of the component after the resize
    expect(component.sideNavMode).toBe('over');
    expect(component.isMobile).toBe(true);
    expect(component.sideNavIsOpened).toBe(false);
  });

  it('should update sidenav when window is resized to 800px or greater', () => {
    viewport.set('desktop');
    component.sideNavMode = 'over';
    component.sideNavIsOpened = false;
    // Call the onResize function
    component.onResize();
    // Add your expectations here for the state of the component after the resize
    expect(component.sideNavMode).toBe('side');
    expect(component.isMobile).toBe(false);
    expect(component.sideNavIsOpened).toBe(true);
  });

  it('should toggle sidenav', () => {
    // Create a spy on the toggle method of the sidenav
    const sidenavToggleSpy = spyOn(component.sidenav, 'toggle');
    // Call the toggleSidenav function
    component.toggleSidenav();
    // Expect that the sidenav's toggle method was called
    expect(sidenavToggleSpy).toHaveBeenCalled();
  });

  it('should close sidenav', () => {
    // Create a spy on the close method of the sidenav
    const sidenavCloseSpy = spyOn(component.sidenav, 'close');
    // Call the closeSidenav function
    component.closeSidenav();
    // Expect that the sidenav's close method was called
    expect(sidenavCloseSpy).toHaveBeenCalled();
  });
});
