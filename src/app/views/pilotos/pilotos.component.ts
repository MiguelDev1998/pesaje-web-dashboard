import { Component, OnInit } from '@angular/core';
import { PilotosController } from '../../controllers/pilotos.controller';
import { Piloto } from '../../models/piloto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-pilotos',
  standalone: true,
  templateUrl: './pilotos.component.html',
  styleUrls: ['./pilotos.component.scss'],
  imports: [CommonModule, FormsModule]   
})
export class PilotosComponent implements OnInit {
  constructor(public controller: PilotosController) {}

  ngOnInit() {
    this.controller.cargarPilotos();
  }

  guardarPiloto() {
    this.controller.guardarPiloto();
  }

  editarPiloto(p: Piloto) {
    this.controller.editarPiloto(p);
  }

  eliminarPiloto(id: number) {
    this.controller.eliminarPiloto(id);
  }

  cancelarEdicion() {
    this.controller.cancelarEdicion();
  }
}
