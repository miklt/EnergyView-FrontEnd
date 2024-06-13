import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RealTimeData } from 'src/app/interfaces/RealTimeData';
import { RealTimeDataService } from '../../services/RealTimeDataService';
import { DomSanitizer } from '@angular/platform-browser';
// after test:
import { IMqttMessage } from 'ngx-mqtt';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  data: RealTimeData | null = null;
  
  @Input() isMobile: boolean = false;
  @Output() closeSideNavEvent: EventEmitter<void> = new EventEmitter<void>();
  demandaAtual = 'Loading...';
  ngOnInit(): void {
    
    this.dataService
      .getRealTimeData()
      .subscribe({
        next: (data) => {          
          const d = data;
          this.demandaAtual = d.PT.toString() +' W';
        }
      });
      
  }
  constructor(
    private readonly dataService: RealTimeDataService,
    private sanitizer: DomSanitizer
  ) {}
  closeSideNavIfOnMobile(): void {
    if (this.isMobile) {
      this.closeSideNavEvent.emit();
    }
  }

  downloadData(): void {
    alert('Em desenvolvimento.');
  }
 
}
