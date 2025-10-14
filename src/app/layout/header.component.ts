import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
@Output() toggleSidebarEvent = new EventEmitter<void>();

toggleSidebar() {
  this.toggleSidebarEvent.emit();
}
}
