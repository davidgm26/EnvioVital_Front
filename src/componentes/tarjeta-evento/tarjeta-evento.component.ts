import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute}  from "@angular/router";
import {EventoService, EventoRequestDto, EventoResponseDto} from "../../services/evento.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-tarjeta-evento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta-evento.component.html',
  styleUrl: './tarjeta-evento.component.css'
})
export class TarjetaEventoComponent implements OnInit {
  //evento?: EventoRequestDto ;

  //@Input() evento!: EventoResponseDto;
  @Input() evento?: EventoResponseDto;

  constructor(
    private route: ActivatedRoute,
    private eventoService: EventoService
  ) {}

  ngOnInit(): void {
    const eventoId = Number(this.route.snapshot.paramMap.get('id'));
    if (eventoId == 0) {
      console.info('El id = 0 no es válido o no existe');
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


}
