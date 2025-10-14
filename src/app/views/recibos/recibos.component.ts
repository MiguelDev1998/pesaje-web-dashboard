import { Component, OnInit } from '@angular/core';
import { ReciboController } from '../../controllers/recibos.controller';
import { CommonModule, DatePipe } from '@angular/common'; 

@Component({
  selector: 'app-recibos',
  standalone: true, 
  imports: [CommonModule, DatePipe], 
  templateUrl: './recibos.component.html',
  styleUrls: ['./recibos.component.scss']
})
export class RecibosComponent implements OnInit {
  constructor(public controller: ReciboController) {}

  ngOnInit() {
    this.controller.cargarRecibos();
  }
}


