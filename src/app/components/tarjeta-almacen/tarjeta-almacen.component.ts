import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlmacenService,  } from '../../services/almacen.service';
import { AlmacenResponse } from '../../interfaces/almacen-response';

@Component({
  selector: 'app-tarjeta-almacen',
  templateUrl: './tarjeta-almacen.component.html',
  standalone: true,
  styleUrls: ['./tarjeta-almacen.component.css'],
  imports: [CommonModule]
})
export class TarjetaAlmacenComponent implements OnInit {


  @Input() almacen!: AlmacenResponse;


  constructor(private almacenService: AlmacenService) {}

  ngOnInit(): void {
    console.log(this.almacen)
  }




}
