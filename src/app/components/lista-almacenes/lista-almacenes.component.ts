import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlmacenService } from '../../services/almacen.service';
import { TarjetaAlmacenComponent } from '../tarjeta-almacen/tarjeta-almacen.component';
import { AlmacenRegistrado } from '../../interfaces/almacen-registrado';
import { ToastrService } from 'ngx-toastr';
import { FiltroEventoProvinciaComponent } from '../shared/filtro-evento-provincia/filtro-evento-provincia.component';
import {FiltroAlmacenProvinciaComponent} from "../shared/filtro-almacen-provincia/filtro-almacen-provincia.component";

@Component({
  selector: 'app-lista-almacenes',
  standalone: true,
  imports: [
    CommonModule,
    TarjetaAlmacenComponent,
    FiltroEventoProvinciaComponent,
    FiltroAlmacenProvinciaComponent
  ],
  templateUrl: './lista-almacenes.component.html',
  styleUrls: ['./lista-almacenes.component.css']
})
export class ListaAlmacenesComponent implements OnInit {
  eventoId!: number;
  provinciaId?: number;
  almacenes: AlmacenRegistrado[] = [];

  constructor(
    private route: ActivatedRoute,
    private almacenService: AlmacenService,
    private toastService: ToastrService,
  ) {}

  ngOnInit(): void {
    // Obtener el ID del evento desde la URL
    this.eventoId = +this.route.snapshot.paramMap.get('id')!;
    this.cargarAlmacenes(); // Cargar almacenes inicialmente sin filtro de provincia
  }

  cargarAlmacenes(provinciaId?: number): void {
    this.almacenes = []; // Limpia la lista antes de cargar nuevos almacenes
    this.provinciaId = provinciaId; // Almacena el filtro actual

    // Llama al servicio con el evento y provincia (si aplica)
    this.almacenService.obtenerAlmacenesPorEventoYProvincia(this.eventoId, provinciaId || 0).subscribe(
      (almacenes) => {
        this.almacenes = almacenes.map((almacen) => almacen.almacen);
        console.log('Almacenes cargados:', this.almacenes);
      },
      (error) => {
        this.toastService.error(error.error?.mensaje || 'Error al cargar almacenes', 'Error');
      }
    );
  }

    // Método llamado desde FiltroEventoProvinciaComponent al cambiar la provincia

  onProvinciaChange(provinciaId: number): void {
    this.cargarAlmacenes(provinciaId);
  }
}
