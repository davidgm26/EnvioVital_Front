import {Component, OnInit} from '@angular/core';
import {TarjetaEventoComponent} from "../tarjeta-evento/tarjeta-evento.component";
import {EventoResponseDto, EventoService} from "../../services/evento.service";
import {NgForOf, NgIf} from "@angular/common";
// import {EventoRequestDto} from "../../services/evento.service";

@Component({
  selector: 'app-lista-eventos',
  standalone: true,
  imports: [
    TarjetaEventoComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './lista-eventos.component.html',
  styleUrl: './lista-eventos.component.css'
})
export class ListaEventosComponent implements OnInit{
  eventos: EventoResponseDto[] = [];
  errorMessage: string = '';

  constructor(private eventoService: EventoService) {}

  ngOnInit(): void {
    this.eventoService.getActiveEventos().subscribe(
      (data: EventoResponseDto[]) => {
        this.eventos = data;
      },
      (error) => {
        this.errorMessage = '¡Error al cargar los eventos! ' + error.message;
        console.error('Error al cargar los eventos:', error);
      }
    );
  }
}
