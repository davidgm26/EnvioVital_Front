import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlmacenService } from '../../../services/almacen.service';
import {NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-filtro-almacen-provincia',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './filtro-almacen-provincia.component.html',
  styleUrls: ['./filtro-almacen-provincia.component.css']
})
export class FiltroAlmacenProvinciaComponent implements OnInit {
  provincias: any[] = [];
  selectedProvincia: number = 0;

  @Output() provinciaChange = new EventEmitter<number>();

  constructor(private almacenService: AlmacenService) {}

  ngOnInit(): void {
    this.almacenService.obtenerProvincias().subscribe((data: any[]) => {
      this.provincias = data;
    });
  }

  onProvinciaChange(): void {
    this.provinciaChange.emit(this.selectedProvincia);
  }

  mostrarTodosLosAlmacenes(): void {
    this.provinciaChange.emit(0); // Emitir 0 para indicar que se deben mostrar todos los almacenes
  }


}
