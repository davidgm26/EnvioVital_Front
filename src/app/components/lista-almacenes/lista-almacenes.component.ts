import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlmacenService } from '../../services/almacen.service';
import { TarjetaAlmacenComponent } from '../tarjeta-almacen/tarjeta-almacen.component';
import { AlmacenRegistrado } from '../../interfaces/almacen-registrado';
import { log } from 'node:console';
import { ToastrService } from 'ngx-toastr';
import {FiltroEventoProvinciaComponent} from "../shared/filtro-evento-provincia/filtro-evento-provincia.component";

@Component({
  selector: 'app-lista-almacenes',
  standalone: true,
  imports: [
    CommonModule,
    TarjetaAlmacenComponent,
    FiltroEventoProvinciaComponent
  ],
  templateUrl: './lista-almacenes.component.html',
  styleUrls: ['./lista-almacenes.component.css']
})
export class ListaAlmacenesComponent implements OnInit {
  eventoId!: number;
  almacenes: AlmacenRegistrado[] = [];

  @Output() provinciaChange = new EventEmitter<number>();


  constructor(
    private route: ActivatedRoute,
    private almacenService: AlmacenService,
    private toastService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.eventoId = +this.route.snapshot.paramMap.get('id')!;
    this.cargarAlmacenes();
  }

  cargarAlmacenes(provinciaId?: number): void {
  this.almacenes = []; // Clear the list of almacenes before loading new ones
  this.almacenService.obtenerAlmacenesPorEventoId(this.eventoId).subscribe(
    (almacenes) => {
      almacenes.forEach((almacen) => {
        if (!provinciaId || provinciaId === 0 || almacen.almacen.provincia === provinciaId.toString()) {
          this.almacenes.push(almacen.almacen);
        }
      });
      console.log(this.almacenes);
    },
    (error) => {
      this.toastService.error(error.error.mensaje, 'Error');
    }
  );
}

onProvinciaChange(provinciaId: number): void {
  this.cargarAlmacenes(provinciaId);
}


}
