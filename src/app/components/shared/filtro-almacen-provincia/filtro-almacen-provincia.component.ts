import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { AlmacenService } from '../../../services/almacen.service';
import { Observable } from 'rxjs';
import { EventoAlmacenResponse } from '../../../interfaces/evento-almacen-response';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-filtro-almacen-provincia',
  templateUrl: './filtro-almacen-provincia.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./filtro-almacen-provincia.component.css']
})
export class FiltroAlmacenProvinciaComponent implements OnInit {
  provincias: any[] = [];
  selectedProvincia: number = 0;
  almacenes: EventoAlmacenResponse[] = [];

  @Output() provinciaChange = new EventEmitter<number>();

  constructor(private almacenService: AlmacenService) { }

  ngOnInit(): void {
    this.almacenService.obtenerProvincias().subscribe((data: any[]) => {
      this.provincias = data;
    });
  }

  onProvinciaChange(): void {
  this.provinciaChange.emit(this.selectedProvincia);
  this.almacenService.obtenerAlmacenesPorEventoId(this.selectedProvincia).subscribe(
    (data: EventoAlmacenResponse[]) => {
      this.almacenes = data;
    },
    (error) => {
      console.error('Error al obtener almacenes:', error);
      this.almacenes = [];
    }
  );
}

  mostrarTodosLosAlmacenes(): void {
    this.provinciaChange.emit(0); // Emitir 0 para indicar que se deben mostrar todos los eventos
    this.almacenService.obtenerAlmacenesPorEventoId(0).subscribe((data: EventoAlmacenResponse[]) => {
      this.almacenes = data;
    });
  }
}
