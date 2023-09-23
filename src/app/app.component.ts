import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'EnergyView';
  sideNavMode: MatDrawerMode = 'side';
  sideNavIsOpened: boolean = true;
  isMobile: boolean = false;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  ngOnInit(): void {
    this.updateSideNav();
  }

  // Listens to resizing of the window
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.updateSideNav(); // Update the sidenav whenever the window is resized
  }

  // Update the sidenav according to the size of the window
  updateSideNav(): void {
    // Gets the current window width
    const screenWidth = window.innerWidth;
    // Checks if the width is smaller than 800px and updates the sidenav accordingly
    if (screenWidth < 800) {
      if (this.sideNavMode === 'side') {
        this.sideNavMode = 'over';
        this.isMobile = true;
      }
      if (this.sideNavIsOpened === true) {
        this.sideNavIsOpened = false; // Closes the sidenav if not already closed
      } 
    }
    else {
      if (this.sideNavMode === 'over') {
        this.sideNavMode = 'side';
        this.isMobile = false;
      }
      if (this.sideNavIsOpened === false) {
        this.sideNavIsOpened = true; // Opens the sidenav if not already open
      } 
    }
  }

  // Toggles the sidenav open/close
  toggleSidenav(): void {
    this.sidenav.toggle(); 
  }

  // Closes the sidenav
  closeSidenav(): void {
    this.sidenav.close(); 
  }
}
