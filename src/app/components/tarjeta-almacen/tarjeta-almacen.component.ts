import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  mostrarBoton: boolean = false;


  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const rol = localStorage.getItem('rol');
      this.mostrarBoton = rol === 'CONDUCTOR';
    }
  }
}
