import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { AlmacenRegistrado } from '../../interfaces/almacen-registrado';
import { NgClass } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../env/environment';

@Component({
  selector: 'app-lista-almacenes-registrados',
  standalone: true,
  imports: [MatTableModule, NgClass, MatIconButton, MatIconModule],
  templateUrl: './lista-almacenes-registrados.component.html',
  styleUrls: ['./lista-almacenes-registrados.component.css'],
})
export class ListaAlmacenesRegistradosComponent implements OnInit {
  @Input() almacenes: AlmacenRegistrado[] = [];

  displayedColumns: string[] = ['nombreAlmacen', 'direccionAlmacen', 'nombreEvento', 'descripcionEvento', 'nombreProvincia', 'estado', 'eliminar'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  eliminarRegistro(id: number): void {
    const confirmDelete = window.confirm('¿Seguro que quieres eliminar este registro?');

    if (confirmDelete) {
      const url = `${environment.apiUrl}/almacenes/eliminarRegistro/${id}`;

      this.http.delete(url).subscribe(
        (response: any) => {
          console.log('Registro eliminado:', response);

          this.almacenes = this.almacenes.filter(almacen => almacen.id !== id);
          alert('Registro eliminado con éxito');
        },
        (error: any) => {
          console.error('Error al eliminar el registro:', error);
          alert('Hubo un error al eliminar el registro');
        }
      );
    } else {
      console.log('Eliminación cancelada');
    }
  }
}
