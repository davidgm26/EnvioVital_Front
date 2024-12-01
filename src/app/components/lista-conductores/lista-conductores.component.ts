import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../env/environment';
import { PopupComponent } from '../popup/popup.component';
import { VehiculoService } from '../../services/vehiculo.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import { MatIconButton } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {ConductorService} from "../../services/conductor.service";

@Component({
  selector: 'app-lista-conductores',
  templateUrl: './lista-conductores.component.html',
  standalone: true,
  imports: [
    MatTable,
    MatHeaderRow,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatIconButton,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatIconModule,
    NgIf
  ],
  styleUrls: ['./lista-conductores.component.css']
})
export class ListaConductoresComponent implements OnInit {
  @Input() conductores: any[] = [];
  vehiculos: any[] = [];
  tiposVehiculo: any[] = [];
  @ViewChild('vehiculosTemplate') vehiculosTemplate!: TemplateRef<any>;

  displayedColumns: string[] = ['nombre', 'apellidos', 'telefono', 'email', 'vehiculos'];

  constructor(private http: HttpClient, public dialog: MatDialog, private vehiculoService: VehiculoService, private conductorService :ConductorService) {}

  ngOnInit(): void {
    this.vehiculoService.obtenerTiposVehiculo().subscribe({
      next: (tipos) => {
        this.tiposVehiculo = tipos;
      },
      error: (error) => console.error('Error al obtener los tipos de vehículo:', error)
    });
  }

  openVehiculosPopup(conductorId: number): void {
    this.conductorService.obtenerListaVehiculos(conductorId).subscribe({
      next: (vehiculos) => {
        this.vehiculos = vehiculos.map(vehiculo => {
          const tipo = this.tiposVehiculo.find(t => t.id === vehiculo.idTipoVehiculo);
          return { ...vehiculo, tipoNombre: tipo ? tipo.nombre : 'Desconocido' };
        });
        this.dialog.open(PopupComponent, {
          width: '600px',
          data: {
            title: 'Lista de Vehículos',
            contentTemplate: this.vehiculosTemplate,
            context: { vehiculos: this.vehiculos }
          }
        });
      },
      error: (error) => console.error('Error al obtener la lista de vehículos:', error)
    });
  }
}
