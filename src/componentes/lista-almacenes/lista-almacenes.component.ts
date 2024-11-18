import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlmacenService } from '../../services/almacen.service';
import { TarjetaAlmacenComponent } from '../tarjeta-almacen/tarjeta-almacen.component';

@Component({
  selector: 'app-lista-almacenes',
  standalone: true,
  imports: [
    CommonModule,
    TarjetaAlmacenComponent
  ],
  templateUrl: './lista-almacenes.component.html',
  styleUrls: ['./lista-almacenes.component.css']
})
export class ListaAlmacenesComponent implements OnInit {
  eventoId!: number //=1;  //Asignar el idEvento que quiera mostar, en vez de en la ruta
  almacenes: any[] = [];
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private almacenService: AlmacenService
  ) {}

  ngOnInit(): void {
    this.eventoId = +this.route.snapshot.paramMap.get('eventoId')!;
    this.cargarAlmacenes();
  }

  cargarAlmacenes(): void {
    this.almacenService.obtenerAlmacenPorEventoId(this.eventoId).subscribe(
      (almacenes) => {
        this.almacenes = almacenes;
      },
      (error) => {
        this.errorMessage = '¡Error al cargar los almacenes! ' + error.message;
        console.error('Error al cargar los almacenes:', error);
      }
    );
  }
}
