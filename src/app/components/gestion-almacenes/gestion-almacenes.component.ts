import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AlmacenRegistrado } from '../../interfaces/almacen-registrado';
import { MatIcon } from '@angular/material/icon';
import { AlmacenService } from '../../services/almacen.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-gestion-almacenes',
  standalone: true,
  imports: [NgIf, MatIcon, NgFor],
  templateUrl: './gestion-almacenes.component.html',
  styleUrl: './gestion-almacenes.component.css'
})
export class GestionAlmacenesComponent implements OnInit {

  listaAlmacen!: AlmacenRegistrado[];

  constructor(
    private almacenService: AlmacenService,
    private dialog: MatDialog,

  ) {

  }

  ngOnInit(): void {
    this.cargarAlmacenes()
  }

  cargarAlmacenes() {
    this.almacenService.obtenerTodosLosAlmacenes().subscribe(
      resp => {
        this.listaAlmacen = resp;
      },
      error => {
        console.error(error);
      }

    );
  }

  abrirConfirmacion(id: number) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Borrar almacen',
        message: '¿Estás seguro de que quieres borrar este almacen?'
      }
    }).afterClosed().subscribe(
      confirmado => {
        if (confirmado) {
          this.borrarAlmacen(id);
        }
      }
    );
  }

  borrarAlmacen(id: number) {
    this.almacenService.borrarAlmacen(id).subscribe({
      next: () => {
        this.cargarAlmacenes();
      },
      error: (error) => {
        console.error('Error borrando almacen:', error);
      }
    });


  }
}



