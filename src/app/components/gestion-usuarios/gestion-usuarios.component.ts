import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ConductorService } from '../../services/conductor.service';
import { ConductorResponse } from '../../interfaces/conductor-response';

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [MatIcon, NgIf, NgFor],
  templateUrl: './gestion-usuarios.component.html',
  styleUrl: './gestion-usuarios.component.css'
})
export class GestionUsuariosComponent implements OnInit {

  listaConductores!: ConductorResponse[];

  constructor(
    private conductorService: ConductorService,
  ) { }


  ngOnInit(): void {
    this.cargarUsuarios();
  }


  cargarUsuarios() {
    this.conductorService.obtenerConductores().subscribe(
      resp => {
        this.listaConductores = resp;
      },
      error => {
        console.error(error);
      }
    );


  }


  cambiarEstado(){
    console.log('cambiar estado');
  }

  editar() {

}
}
