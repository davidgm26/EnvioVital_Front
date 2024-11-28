import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventoService } from '../../../services/evento.service';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-filtro-evento-provincia',
  standalone: true,
  templateUrl: './filtro-evento-provincia.component.html',
  styleUrls: ['./filtro-evento-provincia.component.css'],
  imports: [FormsModule, NgForOf]
})
export class FiltroEventoProvinciaComponent implements OnInit {
  provincias: any[] = [];
  selectedProvincia: number = 0;

  @Output() provinciaChange = new EventEmitter<number>();

  constructor(private eventoService: EventoService) { }

  ngOnInit(): void {
    this.eventoService.getProvincias().subscribe((data: any[]) => {
      this.provincias = data;
    });
  }

  onProvinciaChange(): void {
    this.provinciaChange.emit(this.selectedProvincia);
  }



  mostrarTodosLosEventos(): void {
    this.provinciaChange.emit(0); // Emitir 0 para indicar que se deben mostrar todos los eventos
  }
}
