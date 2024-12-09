import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ConductorService } from '../../../services/conductor.service';
import { ConductorResponse } from '../../../interfaces/conductor-response';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';
import { ConductorRequestDTO } from '../../../interfaces/conductor-request-dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [MatIcon, NgFor, NgClass],
  templateUrl: './gestion-usuarios.component.html',
  styleUrl: './gestion-usuarios.component.css'
})
export class GestionUsuariosComponent implements OnInit {

  listaConductores!: ConductorResponse[];

  constructor(
    private conductorService: ConductorService,
    private dialog: MatDialog,
    private toast: ToastrService,

  ) { }


  ngOnInit(): void {
    this.cargarUsuarios();
  }


  cargarUsuarios() {
    this.conductorService.obtenerConductores().subscribe({
      next: (resp) => {
        this.listaConductores = resp;
      },
      error: (error) => {
        console.error(error);
      }
    }
    );


  }

  cambiarEstado(id: number) {
    this.conductorService.changeConductorState(id).subscribe({
      next: (resp) => {
        const index = this.listaConductores.findIndex(conductor => conductor.id === id);
        if (index !== -1) {
          this.listaConductores[index] = resp;
        }

      },
      error: (err) => {
        console.error('Error al cambiar el estado del conductor', err);
      }
    });

  }

  abrirBorrado(id: number) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Borrar usuario trsansportista',
        message: '¿Estás seguro de que quieres borrar este usuario?'
      }
    }).afterClosed().subscribe(
      confirmado => {
        if (confirmado) {
          this.borrarConductor(id);
        }
      }
    );
  }

  borrarConductor(id: number) {
    this.conductorService.deleteConductor(id).subscribe({
      next: () => this.cargarUsuarios(),
      error: (error) => {
        console.error(error);
      }
    })
  }


  abrirEditar(conductor: ConductorResponse) {
    this.dialog.open(EditarUsuarioComponent, {
      data: conductor
    }).afterClosed().subscribe({
      next: (conductorEdit) =>{
        if(conductorEdit){
          this.peticionEditar(conductor, conductorEdit);
        }
      }}
    );
  }

  peticionEditar(conductor: ConductorResponse, body: ConductorRequestDTO) {
    this.conductorService.actualizarConductor(conductor.id, body).subscribe({
      next: (resp) => {
        const index = this.listaConductores.findIndex(c => c.id === conductor.id);
        if (index !== -1) {
          this.listaConductores[index] = resp;
        }
        this.toast.success('Evento editado','',{
          timeOut: 2000,
        });
        this.cargarUsuarios();
      },
      error: () => {
        this.toast.error('Error al editar el evento', 'Error');
      }}
    );
  }
}
