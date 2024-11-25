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
    this.setDefaultFotoUrl();
  }

 setDefaultFotoUrl(): void {
  if (this.evento && (!this.evento.fotoUrl || this.evento.fotoUrl.trim().length === 0)) {
  this.evento.fotoUrl = "https://acortar.link/hS3Sr8"; // URL de la foto por defecto
}

}
}
