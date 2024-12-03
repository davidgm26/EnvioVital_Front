import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { NgClass } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../env/environment';
import { AlmacenResponse } from '../../interfaces/almacen-response';
import { ConductorService } from '../../services/conductor.service';
import { error } from 'console';

@Component({
  selector: 'app-lista-almacenes-registrados',
  standalone: true,
  imports: [MatTableModule, NgClass, MatIconButton, MatIconModule],
  templateUrl: './lista-almacenes-registrados.component.html',
  styleUrls: ['./lista-almacenes-registrados.component.css'],
})
export class ListaAlmacenesRegistradosComponent implements OnInit {
  @Input() almacenes: AlmacenResponse[] = [];

  displayedColumns: string[] = ['nombreAlmacen', 'direccionAlmacen', 'nombreEvento', 'descripcionEvento', 'nombreProvincia', 'estado', 'eliminar'];

  constructor(private http: HttpClient,
    private conductorService: ConductorService
  ) { }



  ngOnInit(): void { }

  eliminarRegistro(id: number) {
    this.conductorService.eliminarConductorDeEventoAlmacen(id).subscribe({
      next: (response) => {
        alert('Registro eliminado correctamente');
        this.almacenes = this.almacenes.filter((almacen) => almacen.id !== id);
      },
      error: (error) => { 
        alert('Error al eliminar el registro');
      }
    })

  }


}
