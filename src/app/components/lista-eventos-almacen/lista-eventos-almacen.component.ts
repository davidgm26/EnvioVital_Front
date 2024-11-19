import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { NgClass } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface Evento {
  id: number;
  idEvento: number;
  nombreEvento: string;
  descripcionEvento: string;
  nombreProvincia: string;
  estado: boolean;
}

@Component({
  selector: 'app-lista-eventos-almacen',
  standalone: true,
  imports: [MatTableModule, NgClass, MatIconButton, MatIconModule],
  templateUrl: './lista-eventos-almacen.component.html',
  styleUrls: ['./lista-eventos-almacen.component.css'],
})
export class ListaEventosAlmacenComponent implements OnInit {
  @Input() eventos: Evento[] = [];

  displayedColumns: string[] = ['idEvento', 'nombreEvento', 'descripcionEvento', 'nombreProvincia', 'estado', 'eliminar'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  eliminarRegistro(id: number): void {
    const confirmDelete = window.confirm('¿Seguro que quieres eliminar este registro?');

    if (confirmDelete) {
      const url = `http://localhost:8081/almacenes/eliminarRegistro/${id}`;

      this.http.delete(url).subscribe(
        (response: any) => {
          console.log('Registro eliminado:', response);

          this.eventos = this.eventos.filter(evento => evento.id !== id);
          alert('Registro eliminado con éxito'); // Muestra una alerta si el registro se elimina correctamente
        },
        (error: any) => {
          console.error('Error al eliminar el registro:', error);
          alert('Hubo un error al eliminar el registro'); // Muestra una alerta si hay un error
        }
      );
    } else {
      console.log('Eliminación cancelada');
    }
  }
}
