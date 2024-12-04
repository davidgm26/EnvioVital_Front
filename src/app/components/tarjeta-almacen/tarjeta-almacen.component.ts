import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { AlmacenRegistrado } from '../../interfaces/almacen-registrado';
import { ConductorService } from '../../services/conductor.service';
import { ToastrService } from 'ngx-toastr';
import { AlmacenService } from '../../services/almacen.service';
import { AlmacenResponse } from '../../interfaces/almacen-response';
import { ConductorResponse } from '../../interfaces/conductor-response';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-tarjeta-almacen',
  templateUrl: './tarjeta-almacen.component.html',
  standalone: true,
  styleUrls: ['./tarjeta-almacen.component.css'],
  imports: [CommonModule, NgIf],
})
export class TarjetaAlmacenComponent implements OnInit {
  @Input() almacen!: AlmacenResponse;
  @Input() eventoAlmacenId!: number;
  mostrarBoton: boolean = false;
  conductorId: number | null = null;
  usuarioInscrito!: Boolean;

  constructor(
    private conductorService: ConductorService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const rol = localStorage.getItem('rol');
    const usuarioId = localStorage.getItem('id'); // Usar clave correcta ("id")
    const logged = localStorage.getItem('logged') === 'true';

    if (!logged) {
      this.toastr.warning('Inicia sesión para poder inscribirte', 'Error');
      return;
    }

    this.mostrarBoton = rol === 'CONDUCTOR';

    if (usuarioId) {
      this.conductorService.obtenerConductorPorId(+usuarioId).subscribe({
        next: (conductor: ConductorResponse) => {
          this.conductorId = conductor.id;
          this.comprobarInscripcion(this.eventoAlmacenId, this.conductorId!, this.almacen.id);
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
      .registrarConductorEnEvento(this.eventoAlmacenId, this.conductorId, this.almacen.id)
      .subscribe({
        next: () => {
          this.toastr.success(
            `Te has inscrito exitosamente en el almacén ${this.almacen.nombre}.`,
            'Éxito'
          );
          this.usuarioInscrito = true; // Actualizar el estado a inscrito
        },
        error: (error) => {
          this.toastr.error(
            error.error?.mensaje || 'Ocurrió un error al inscribirse.',
            'Error'
          );
        },
      });
  }

  comprobarInscripcion(idConductor: number, idEventoAlmacen: number, idAlmacen: number): void {
    this.conductorService.comprobarInscripcion(idEventoAlmacen, idConductor, idAlmacen).subscribe({
      next: (resp) => {
        this.usuarioInscrito = resp;
      },
      error: (error) => {
        console.error('peticion incorrecta');
      }
    });
  }

  openDialog(): void {
    this.dialog.open(PopupComponent, {
      data: {
        title: 'Descripción del Almacén',
        contentTemplate: null,
        context: { descripcion: this.almacen.descripcion }
      }
    });
  }
}
