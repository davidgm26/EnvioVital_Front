import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../interfaces/evento';

@Component({
  selector: 'app-tarjeta-evento',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './tarjeta-evento.component.html',
  styleUrl: './tarjeta-evento.component.css'
})
export class TarjetaEventoComponent implements OnInit {

  @Input() evento?: Evento

  constructor(
    private route: ActivatedRoute,
    private eventoService: EventoService
  ) {}

  ngOnInit(): void {
      
  }
/*
  ngOnInit(): void {
    const eventoId = Number(this.route.snapshot.paramMap.get('id'));
    if (eventoId == 0) {
      return;
    }
    this.eventoService.getEventoById(eventoId).subscribe({
      next: (respuesta)=> {
        this.evento = respuesta;
        console.info(respuesta);
      } ,
      error:(error) => console.log(error),
      complete:()=> console.info('petición enviada')

    });

  }
*/


}
