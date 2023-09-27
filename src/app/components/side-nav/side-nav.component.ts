import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  @Input() showCloseSideNavButton: boolean = false;
  @Output() closeSideNavEvent: EventEmitter<void> = new EventEmitter<void>();
  demandaAtual = 702;

  // Emits the event to notify the parent component
  closeSideNav() {
    this.closeSideNavEvent.emit();
  }
}
