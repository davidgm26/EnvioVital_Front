import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlmacenService, EventoAlmacenDtoResponse } from '../../services/almacen.service';

@Component({
  selector: 'app-tarjeta-almacen',
  templateUrl: './tarjeta-almacen.component.html',
  standalone: true,
  styleUrls: ['./tarjeta-almacen.component.css'],
  imports: [CommonModule]
})
export class TarjetaAlmacenComponent implements OnInit {

  @Input() nombreAlmacen!: string;
  @Input() nombreProvincia!: string;

  // @Input() almacen?: EventoAlmacenDtoResponse;


  constructor(private almacenService: AlmacenService) {}

  ngOnInit(): void {}
}
