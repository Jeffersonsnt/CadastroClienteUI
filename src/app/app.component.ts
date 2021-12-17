import { Component, OnInit } from '@angular/core';
import { ClienteService } from './services/cliente.service';
import { Cliente } from './models/cliente';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  cliente = {} as Cliente;
  clientes!: Cliente[];

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.getClients();
  }

  getClient(id: number) {
    this.clienteService.getClienteById(id).subscribe((cliente: Cliente) => {
      this.cliente = cliente;
    });
  }

  getClients() {
    this.clienteService.getClientes().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
      console.log(this.cliente)
    });
  }

  saveClient(form: NgForm) {
    if (this.cliente.id !== undefined) {
      this.clienteService.updateCliente(this.cliente).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.clienteService.saveCliente(this.cliente).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  deleteClient(cliente: Cliente) {
    this.clienteService.deleteCliente(cliente).subscribe(() => {
      this.getClients();
    });
  }

  editClient(cliente: Cliente) {
    this.cliente = cliente;
    console.log(cliente);
  }

  cleanForm(form: NgForm) {
    this.getClients();
    form.resetForm();
    this.cliente = {} as Cliente;
  }

}
