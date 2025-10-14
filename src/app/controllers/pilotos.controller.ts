import { Injectable } from '@angular/core';
import { PilotoService } from '../services/piloto.service';
import { Piloto } from '../models/piloto';


@Injectable({ providedIn: 'root' })
export class PilotosController {
  pilotos: Piloto[] = [];
  piloto: Piloto = { nombre: '', licencia: '', telefono: '' };
  editando: boolean = false;
  pilotoId?: number;

  constructor(private pilotoService: PilotoService) {}

  cargarPilotos() {
    this.pilotoService.listar().subscribe(data => this.pilotos = data);
  }

  guardarPiloto(form?: any) {
  if (!this.piloto.nombre || !this.piloto.licencia || !this.piloto.telefono) {
    alert("Todos los campos son obligatorios");
    return;
  }

  if (this.editando) {
    this.pilotoService.actualizar(this.pilotoId!, this.piloto).subscribe(() => {
      this.cargarPilotos();
      this.cancelarEdicion();
    });
  } else {
    this.pilotoService.crear(this.piloto).subscribe(() => {
      this.cargarPilotos();
      this.piloto = { nombre: '', licencia: '', telefono: '' };
    });
  }
}


  editarPiloto(p: Piloto) {
    this.editando = true;
    this.pilotoId = p.id;
    this.piloto = { ...p };
  }

  eliminarPiloto(id: number) {
  const confirmar = window.confirm("¿Estás seguro que deseas eliminar este piloto?");
  if (confirmar) {
    this.pilotoService.eliminar(id).subscribe(() => {
      this.cargarPilotos();
    });
  }
}


  cancelarEdicion() {
    this.editando = false;
    this.piloto = { nombre: '', licencia: '', telefono: '' };
  }
}
