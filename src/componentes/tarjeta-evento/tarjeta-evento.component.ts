import { Component, OnInit } from '@angular/core';
import { ActivatedRoute}  from "@angular/router";
import {EventoService, EventoRequestDto}  from "../../services/evento.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-tarjeta-evento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta-evento.component.html',
  styleUrl: './tarjeta-evento.component.css'
})
export class TarjetaEventoComponent implements OnInit {
  evento?: EventoRequestDto ;

  constructor(
    private route: ActivatedRoute,
    private eventoService: EventoService
  ) {}

  ngOnInit(): void {
    const eventoId = Number(this.route.snapshot.paramMap.get('id'));
    this.eventoService.getEventoById(eventoId).subscribe({
      next: (respuesta)=> {
        this.evento = respuesta;
        console.info(respuesta);
      } ,
      error:(error) => console.log(error),
      complete:()=> console.info('petición enviada')

    });

  }


}
