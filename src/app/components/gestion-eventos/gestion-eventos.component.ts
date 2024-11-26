import { NgFor, NgIf } from '@angular/common';
import { Component,Input,OnInit } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { MatIcon } from '@angular/material/icon';
import { Evento } from '../../interfaces/evento';

@Component({
  selector: 'app-gestion-eventos',
  standalone: true,
  imports: [NgFor,MatIcon,NgIf],
  templateUrl: './gestion-eventos.component.html',
  styleUrl: './gestion-eventos.component.css'
})
export class GestionEventosComponent implements OnInit{

  

  listaEventos!: Evento[];

  constructor(
    private eventoService: EventoService
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

}
