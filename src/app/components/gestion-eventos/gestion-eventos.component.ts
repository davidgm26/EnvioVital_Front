import { NgFor } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { TablaAdminComponent } from "../tabla-admin/tabla-admin.component";
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-gestion-eventos',
  standalone: true,
  imports: [TablaAdminComponent, NgFor, TablaAdminComponent,MatIcon],
  templateUrl: './gestion-eventos.component.html',
  styleUrl: './gestion-eventos.component.css'
})
export class GestionEventosComponent implements OnInit{

  

  listaEventos: any[] = [];
  headers: string[] = ['ID', 'Nombre', 'Fecha', 'Hora', 'Lugar', 'Cupo', 'Estado', 'Acciones'];

  constructor(
    private eventoService: EventoService
  ) { }

  ngOnInit(): void {
      this.cargarEventos();
      console.log(this.listaEventos);
  }

  cargarEventos(){
    this.eventoService.getAllEventos().subscribe(
      resp =>{
        this.listaEventos = resp;
      },
      error =>{
        console.error(error);
      }

    );
  }
}
