import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service';

@Injectable({ providedIn: 'root' })
export class ClientesController {
  clientes: Cliente[] = [];
  cliente: Cliente = {
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    dpi: '',
    direccion: '',
    telefono: '',
    correo: ''
  };
  editando: boolean = false;
  clienteId?: number;

  constructor(private clienteService: ClienteService) {}

  cargarClientes() {
    this.clienteService.listar().subscribe(data => this.clientes = data);
  }

  guardarCliente() {
  // Validar campos obligatorios
  if (
    !this.cliente.primer_nombre ||
    !this.cliente.primer_apellido ||
    !this.cliente.dpi ||
    !this.cliente.direccion ||
    !this.cliente.telefono
    
  ) {
    alert("Algunos campos faltantes o vacios.");
    return;
  }

  if (this.editando) {
    this.clienteService.actualizar(this.clienteId!, this.cliente).subscribe(() => {
      this.cargarClientes();
      this.cancelarEdicion();
    });
  } else {
    this.clienteService.crear(this.cliente).subscribe(() => {
      this.cargarClientes();
      this.cliente = {
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        dpi: '',
        direccion: '',
        telefono: '',
        correo: ''
      };
    });
  }
}


  editarCliente(c: Cliente) {
    this.editando = true;
    this.clienteId = c.id;
    this.cliente = { ...c };
  }

  eliminarCliente(id: number) {
    if (confirm('¿Seguro que deseas eliminar este cliente?')) {
      this.clienteService.eliminar(id).subscribe(() => this.cargarClientes());
    }
  }

  cancelarEdicion() {
    this.editando = false;
    this.cliente = {
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      dpi: '',
      direccion: '',
      telefono: '',
      correo: ''
    };
  }
}

