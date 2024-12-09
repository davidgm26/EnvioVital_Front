import { Component, OnInit } from '@angular/core';
import { Evento } from '../../interfaces/evento';
import { EventoService } from '../../services/evento.service';
import { TarjetaEventoComponent } from '../tarjeta-evento/tarjeta-evento.component';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-eventos-almacen',
  standalone: true,
  imports: [TarjetaEventoComponent, NgIf, NgFor, RouterLink],
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css']
})
export class ListaEventosComponent implements OnInit {
  eventos: Evento[] = [];
  isLogged: boolean = false;
  isConductor: boolean = false;
  isAlmacen: boolean = false;

  constructor(private eventoService: EventoService) {}

  ngOnInit(): void {
    this.checkUserRole();
    this.cargarEventos();
  }

  checkUserRole(): void {
    const role = localStorage.getItem('rol');
    this.isLogged = !!role;
    this.isConductor = role === 'CONDUCTOR';
    this.isAlmacen = role === 'ALMACEN';
  }

  cargarEventos(): void {
    this.eventoService.getActiveEventos().subscribe(
      (data) => {
        this.eventos = data;
      },
      (error) => {
        console.error('Error al cargar los eventos:', error);
      }
    );
  }
}
