import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { NgClass } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../env/environment';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

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

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit(): void {}

  eliminarVehiculo(id: number): void {
    Swal.fire({
      title: 'Confirmación',
      text: '¿Seguro que quieres eliminar este vehículo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      toast: true,
      position: 'top',
      timer: 5000,
      timerProgressBar: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `${environment.apiUrl}/vehiculos/eliminar/${id}`;

        this.http.delete(url).subscribe(
          (response: any) => {
            this.toastr.success('Vehículo eliminado con éxito');
            this.vehiculos = this.vehiculos.filter(vehiculo => vehiculo.id !== id);
          },
          (error: any) => {
            this.toastr.error('Hubo un error al eliminar el vehículo');
          }
        );
      } else {
        this.toastr.info('Operación cancelada');
      }
    });
  }
}
