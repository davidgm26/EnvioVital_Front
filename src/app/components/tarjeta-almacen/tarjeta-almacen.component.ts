import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlmacenRegistrado } from '../../interfaces/almacen-registrado';
import { ConductorService } from '../../services/conductor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarjeta-almacen',
  templateUrl: './tarjeta-almacen.component.html',
  standalone: true,
  styleUrls: ['./tarjeta-almacen.component.css'],
  imports: [CommonModule],
})
export class TarjetaAlmacenComponent implements OnInit {
  @Input() almacen!: AlmacenRegistrado;
  mostrarBoton: boolean = false;
  conductorId: number | null = null;

  constructor(
    private conductorService: ConductorService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const rol = localStorage.getItem('rol');
    const usuarioId = localStorage.getItem('id'); // Usar clave correcta ("id")

    this.mostrarBoton = rol === 'CONDUCTOR';

    if (usuarioId) {
      this.conductorService.obtenerIdConductorPorUsuario(+usuarioId).subscribe({
        next: (id: number) => {
          this.conductorId = id;
        },
        error: () => {
          this.toastr.error('No se pudo obtener el ID del conductor.', 'Error');
        },
      });
    } else {
      this.toastr.error('No se encontró el ID del usuario.', 'Error');
    }
  }

  inscribirse(): void {
    if (!this.conductorId) {
      this.toastr.error('No se encontró el ID del conductor.', 'Error');
      return;
    }

    this.conductorService
      .registrarConductorEnEvento(this.almacen.id, this.conductorId)
      .subscribe({
        next: () => {
          this.toastr.success(
            `Te has inscrito exitosamente en el almacén ${this.almacen.nombre}.`,
            'Éxito'
          );
        },
        error: (error) => {
          this.toastr.error(
            error.error?.mensaje || 'Ocurrió un error al inscribirse.',
            'Error'
          );
        },
      });
  }
}
