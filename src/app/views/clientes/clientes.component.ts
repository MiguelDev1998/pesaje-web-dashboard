import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientesController } from '../../controllers/clientes.controller';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  constructor(public controller: ClientesController) {}

  ngOnInit() {
    this.controller.cargarClientes();
  }

  guardarCliente() {
    this.controller.guardarCliente();
  }

  editarCliente(c: Cliente) {
    this.controller.editarCliente(c);
  }

  eliminarCliente(id: number) {
    this.controller.eliminarCliente(id);
  }

  cancelarEdicion() {
    this.controller.cancelarEdicion();
  }
}
