import { NgClass, NgFor } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AlmacenService } from '../../../services/almacen.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { AlmacenResponse } from '../../../interfaces/almacen-response';
import { EditarAlmacenComponent } from '../editar-almacen/editar-almacen.component';
import { ToastrService } from 'ngx-toastr';
import { AlmacenRequestDTO } from '../../../interfaces/almacen-request-dto';

@Component({
  selector: 'app-gestion-almacenes',
  standalone: true,
  imports: [NgFor, NgClass,MatIcon],
  templateUrl: './gestion-almacenes.component.html',
  styleUrl: './gestion-almacenes.component.css'
})
export class GestionAlmacenesComponent implements OnInit {

  listaAlmacen!: AlmacenResponse[];

  constructor(
    private almacenService: AlmacenService,
    private dialog: MatDialog,
    private toast: ToastrService

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

  cambiarEstado(id: number) {
    this.almacenService.changeAlmacenState(id).subscribe({
      next: (resp) => {
        const index = this.listaAlmacen.findIndex(almacen => almacen.id === id);
        if (index !== -1) {
          this.listaAlmacen[index] = resp;
        }
      }
    });
  }

  editarAlmacen(id:number, body: AlmacenRequestDTO){
    this.almacenService.actualizarAlmacen(id,body).subscribe({
      next: (resp)=>{
        const index = this.listaAlmacen.findIndex(almacen => almacen.id === id);
        if (index !== -1) {
          this.listaAlmacen[index] = resp;
        }
      },
      error: (error) => {
        this.toast.error('Error al editar el almacen', 'Error');
      }
    })
  }

  abrirEditar(almacen: AlmacenResponse){
    this.dialog.open(EditarAlmacenComponent, {
      data: almacen
  }).afterClosed().subscribe({
    next: (resp) => {
      if(resp){
        this.editarAlmacen(almacen.id, resp);
      }
    },
    error: (error) => {
      this.toast.error('Error al editar el almacen', 'Error');
    }
  });

  }

}



