import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component,Input,OnInit } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { MatIcon } from '@angular/material/icon';
import { Evento } from '../../interfaces/evento';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EditarEventoComponent } from '../editar-evento/editar-evento.component';

@Component({
  selector: 'app-gestion-eventos',
  standalone: true,
  imports: [NgFor,MatIcon,NgClass],
  templateUrl: './gestion-eventos.component.html',
  styleUrl: './gestion-eventos.component.css'
})
export class GestionEventosComponent implements OnInit{

  

  listaEventos!: Evento[];

  constructor(
    private eventoService: EventoService,
    private dialog:MatDialog,
  ) { }

  ngOnInit(): void {
      this.cargarEventos();
  }

  cargarEventos(){
    this.eventoService.getAllEventos().subscribe(
      resp =>{
        this.listaEventos = resp;
      },
      error =>{
        console.error(error);
      }

    );
  }

  cambiarEstado(id: number){
    this.eventoService.changeEventoState(id).subscribe({
      next: (resp) => {
        const index = this.listaEventos.findIndex(evento => evento.id === id);
        if (index !== -1) {
          this.listaEventos[index] = resp;
        }
      },
      error: (error) => {
        console.error('Error changing event state:', error);
      }
    });
  }

  abrirBorrado(id: number){
    this.dialog.open(ConfirmDialogComponent,{
      data: {
        title: 'Borrar evento',
        message: '¿Estás seguro de que quieres borrar este evento?'
      }
  }).afterClosed().subscribe(
    confirmado => {
      if(confirmado){
        this.borrarEvento(id);
    }
  }
  );
}
  
  borrarEvento(id: number){
    this.eventoService.deleteEvento(id).subscribe(
      {
        next: () => this.cargarEventos(),
        error: (error) => console.error(error)
      }
    );
    this.cargarEventos();
  }
  

  abrirEditar(evento: Evento){
    this.dialog.open(EditarEventoComponent,{
      data: evento
  });
}


}
