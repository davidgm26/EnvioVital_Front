import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlmacenService } from '../../../services/almacen.service';
import { TarjetaAlmacenComponent } from '../../tarjeta-almacen/tarjeta-almacen.component';
import { ToastrService } from 'ngx-toastr';
import { AlmacenResponse } from '../../../interfaces/almacen-response';

@Component({
  selector: 'app-lista-almacenes',
  standalone: true,
  imports: [
    CommonModule,
    TarjetaAlmacenComponent,
    RouterLink
  ],
  templateUrl: './lista-almacenes.component.html',
  styleUrls: ['./lista-almacenes.component.css']
})
export class ListaAlmacenesComponent implements OnInit {
  eventoAlmacenId!: number;
  eventoId!: number;
  almacenes: AlmacenResponse[] = [];
  isLogged: boolean = false;
  isConductor: boolean = false;
  isAlmacen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private almacenService: AlmacenService,
    private toastService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.checkUserRole();
    this.eventoId = +this.route.snapshot.paramMap.get('id')!;
    this.cargarAlmacenes();
  }

  checkUserRole(): void {
    const role = localStorage.getItem('rol');
    this.isLogged = !!role; // Check if user is logged in
    this.isConductor = role === 'CONDUCTOR';
    this.isAlmacen = role === 'ALMACEN';
  }

  cargarAlmacenes(): void {
    this.almacenService.obtenerAlmacenesPorEventoId(this.eventoId).subscribe(
      (almacenes) => {
        almacenes.forEach((almacen => {
          this.almacenes.push(almacen.almacen);
          this.eventoAlmacenId = almacen.id;
        }));
      },
      (error) => {
        this.toastService.error(error.error.mensaje, 'Error');
      }
    );
  }
}
