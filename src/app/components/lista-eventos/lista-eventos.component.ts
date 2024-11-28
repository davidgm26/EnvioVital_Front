import { Component, OnInit } from '@angular/core';
import { Evento } from '../../interfaces/evento';
import { EventoService } from '../../services/evento.service';
import { TarjetaEventoComponent } from '../tarjeta-evento/tarjeta-evento.component';
import { NgFor, NgIf } from '@angular/common';
import { FiltroEventoProvinciaComponent } from '../shared/filtro-evento-provincia/filtro-evento-provincia.component';

@Component({
  selector: 'app-lista-eventos-almacen',
  standalone: true,
  imports: [TarjetaEventoComponent, NgIf, NgFor, FiltroEventoProvinciaComponent],
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css']
})
export class ListaEventosComponent implements OnInit {
  eventos: Evento[] = [];

  constructor(private eventoService: EventoService) {}

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos(provinciaId?: number): void {
    if (provinciaId) {
      this.eventoService.getEventosByProvinciaId(provinciaId).subscribe(
        (data) => {
          this.eventos = data;
        },
        (error) => {
          console.error('Sin eventos asociados.');
          this.eventos = [];
        }
      );
    } else {
      this.eventoService.getActiveEventos().subscribe(
        (data) => {
          this.eventos = data;
        },
        (error) => {
          console.error('Error al cargar los eventos.');
          this.eventos = [];
        }
      );
    }
  }

  onProvinciaChange(provinciaId: number): void {
    this.cargarEventos(provinciaId);
  }
}
