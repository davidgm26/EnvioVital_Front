import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlmacenService } from '../../services/almacen.service';
import { TarjetaAlmacenComponent } from '../tarjeta-almacen/tarjeta-almacen.component';
import { log } from 'node:console';
import { ToastrService } from 'ngx-toastr';
import { AlmacenResponse } from '../../interfaces/almacen-response';

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
  eventoId!: number;
  almacenes: AlmacenResponse[] = [];

  constructor(
    private route: ActivatedRoute,
    private almacenService: AlmacenService,
    private toastService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.eventoId = +this.route.snapshot.paramMap.get('id')!;
    this.cargarAlmacenes();
  }

  cargarAlmacenes(): void {
    this.almacenService.obtenerAlmacenesPorEventoId(this.eventoId).subscribe(
      (almacenes) => {
        almacenes.forEach((almacen => {
          this.almacenes.push(almacen.almacen);
          console.log(this.almacenes);
        }));
      },
      (error) => {
        this.toastService.error(error.error.mensaje, 'Error');
      }
    );
  }
}
