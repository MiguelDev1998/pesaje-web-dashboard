import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {RouterModule, Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [ RouterModule, CommonModule,]
})
export class SidebarComponent {
  @Input() mini: boolean = false;

  constructor(private router: Router) {}
  logout() {
     localStorage.removeItem('usuario'); // elimina sesión
    this.router.navigate(['/login']);   
    
  }
}
