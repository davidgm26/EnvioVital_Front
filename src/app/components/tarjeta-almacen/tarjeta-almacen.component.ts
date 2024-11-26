import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlmacenService,  } from '../../services/almacen.service';
import { AlmacenRegistrado } from '../../interfaces/almacen-registrado';

@Component({
  selector: 'app-tarjeta-almacen',
  templateUrl: './tarjeta-almacen.component.html',
  standalone: true,
  styleUrls: ['./tarjeta-almacen.component.css'],
  imports: [CommonModule]
})
export class TarjetaAlmacenComponent implements OnInit {


  @Input() almacen!: AlmacenRegistrado;


  constructor(private almacenService: AlmacenService) {}

  ngOnInit(): void {
    this.setDefaultFotoUrl();
    console.log(this.almacen)
  }

  setDefaultFotoUrl(): void {
    if (this.almacen && (!this.almacen.fotoUrl || this.almacen.fotoUrl.trim().length === 0)) {
      this.almacen.fotoUrl = "https://acortar.link/gRkyyF"; // URL de la foto por defecto
    }
  }


}
