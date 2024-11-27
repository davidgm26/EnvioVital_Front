import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AlmacenRegistrado } from '../../interfaces/almacen-registrado';
import { MatIcon } from '@angular/material/icon';
import { AlmacenService } from '../../services/almacen.service';

@Component({
  selector: 'app-gestion-almacenes',
  standalone: true,
  imports: [NgIf, MatIcon, NgFor],
  templateUrl: './gestion-almacenes.component.html',
  styleUrl: './gestion-almacenes.component.css'
})
export class GestionAlmacenesComponent implements OnInit {

  listaAlmacen!: AlmacenRegistrado[];

  constructor(
    private almacenService: AlmacenService
  ) {

  }

  ngOnInit(): void {
    this.cargarAlmacenes()
  }

  cargarAlmacenes() {
    this.almacenService.obtenerTodosLosAlmacenes().subscribe(
      resp => {
        this.listaAlmacen = resp;
      },
      error => {
        console.error(error);
      }

    );
  }


}



