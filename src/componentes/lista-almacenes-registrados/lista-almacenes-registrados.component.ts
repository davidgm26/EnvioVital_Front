import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';  // Importa HttpClient y HttpClientModule
import { MatTableModule } from '@angular/material/table';
import { AlmacenRegistrado } from '../../app/models/almacen-registrado.model';
import { NgClass } from '@angular/common';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-lista-almacenes-registrados',
  standalone: true,
  imports: [MatTableModule, HttpClientModule, NgClass, MatIcon, MatIconButton],
  templateUrl: './lista-almacenes-registrados.component.html',
  styleUrls: ['./lista-almacenes-registrados.component.css'],
})
export class ListaAlmacenesRegistradosComponent implements OnInit {
  @Input() almacenes: AlmacenRegistrado[] = [];

  displayedColumns: string[] = ['nombreAlmacen', 'direccionAlmacen', 'nombreEvento', 'descripcionEvento', 'nombreProvincia', 'estado', 'eliminar'];

  constructor(private http: HttpClient) {} // Inyecta HttpClient

  ngOnInit(): void {}

  eliminarRegistro(id: number): void {
    // Mostrar un cuadro de confirmación antes de eliminar
    const confirmDelete = window.confirm('¿Seguro que quieres eliminar este registro?');

    if (confirmDelete) {
      const url = `http://localhost:8081/conductores/eliminarRegistro/${id}`;

      this.http.delete(url).subscribe(
        (response) => {
          console.log('Registro eliminado:', response);
          // Elimina el registro de la lista local
          this.almacenes = this.almacenes.filter(almacen => almacen.id !== id);
          alert('Registro eliminado con éxito'); // Muestra una alerta si el registro se elimina correctamente
        },
        (error) => {
          console.error('Error al eliminar el registro:', error);
          alert('Hubo un error al eliminar el registro'); // Muestra una alerta si hay un error
        }
      );
    } else {
      console.log('Eliminación cancelada');
    }
  }
}
