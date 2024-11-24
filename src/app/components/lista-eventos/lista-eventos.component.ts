import {Component, OnInit} from '@angular/core';
import { Evento } from '../../interfaces/evento';
import { EventoService } from '../../services/evento.service';
import { TarjetaEventoComponent } from '../tarjeta-evento/tarjeta-evento.component';
import { NgFor, NgIf } from '@angular/common';
import { log } from 'console';

@Component({
  selector: 'app-lista-eventos-almacen',
  standalone: true,
  imports: [TarjetaEventoComponent,NgIf,NgFor],
  templateUrl: './lista-eventos.component.html',
  styleUrl: './lista-eventos.component.css'
})
export class ListaEventosComponent implements OnInit{
  eventos: Evento[] = [];

  constructor(private eventoService: EventoService) {}

  ngOnInit(): void {
    this.cargarEventos();
  }


  cargarEventos(){
    this.eventoService.getActiveEventos().subscribe(
      (data) => {
      this.eventos = data;
      },
      (error) => {
        console.error('Error al cargar los eventos:',error);
      }
    )
  }
}
