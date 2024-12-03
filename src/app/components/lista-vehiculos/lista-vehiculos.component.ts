import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { NgClass } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../env/environment';

@Component({
  selector: 'app-lista-vehiculos',
  standalone: true,
  imports: [MatTableModule, NgClass, MatIconButton, MatIconModule],
  templateUrl: './lista-vehiculos.component.html',
  styleUrls: ['./lista-vehiculos.component.css'],
})
export class ListaVehiculosComponent implements OnInit {
  @Input() vehiculos: any[] = [];

  displayedColumns: string[] = ['marca', 'modelo', 'matricula', 'eliminar'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  eliminarVehiculo(id: number): void {
    const confirmDelete = window.confirm('¿Seguro que quieres eliminar este vehículo?');

    if (confirmDelete) {
      const url = `${environment.apiUrl}/vehiculos/eliminar/${id}`;

      this.http.delete(url).subscribe(
        (response: any) => {
          console.log('Vehículo eliminado:', response);

          this.vehiculos = this.vehiculos.filter(vehiculo => vehiculo.id !== id);
          alert('Vehículo eliminado con éxito');
        },
        (error: any) => {
          console.error('Error al eliminar el vehículo:', error);
          alert('Hubo un error al eliminar el vehículo');
        }
      );
    } else {
      console.log('Eliminación cancelada');
    }
  }
}
