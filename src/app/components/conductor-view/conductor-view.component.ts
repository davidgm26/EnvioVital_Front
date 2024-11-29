import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ListaAlmacenesRegistradosComponent } from "../lista-almacenes-registrados/lista-almacenes-registrados.component";
import { ConductorService } from '../../services/conductor.service';
import { ConductorFormComponent } from "../conductor-form/conductor-form.component";
import { CambiarPassComponent } from "../cambiar-pass/cambiar-pass.component";
import { DatePipe, NgClass, NgIf } from "@angular/common";
import { VehiculoFormComponent } from "../vehiculo-form/vehiculo-form.component";
import { AlmacenResponse } from '../../interfaces/almacen-response';

@Component({
  selector: 'app-conductor-view',
  templateUrl: './conductor-view.component.html',
  standalone: true,
  imports: [ListaAlmacenesRegistradosComponent, ConductorFormComponent, CambiarPassComponent, NgClass, NgIf, DatePipe, VehiculoFormComponent],
  styleUrls: ['./conductor-view.component.css']
})
export class ConductorViewComponent implements OnInit {
  conductor: any = {};
  usuarioUsername: string = '';
  conductorId!: number;
  userId!: number;
  activeTab: string = 'details';
  almacenes: AlmacenResponse[] = [];
  @Output() reloadDataEvent = new EventEmitter<void>();

  constructor(
    private router: Router,
    private conductorService: ConductorService
  ) {}

  ngOnInit(): void {
    this.reloadDataEvent.subscribe(() => this.reloadData());
    const storedUserId = localStorage.getItem('id');
    if (storedUserId) {
      this.userId = Number(storedUserId);
      this.cargarDatosConductor();
    } else {
      this.redirigirAInicio();
    }
  }

  private cargarDatosConductor(): void {
    this.conductorService.obtenerConductorPorUsuario(this.userId).subscribe({
      next: (conductor) => {
        console.log('Datos del conductor recibidos:', conductor);
        this.conductor = conductor;
        this.conductorId = conductor.id;
        this.usuarioUsername = conductor.nombre;
        this.obtenerListaAlmacenes();
      },
      error: (error) => {
        console.error('Error al cargar los datos del conductor:', error);
      }
    });
  }

  private obtenerListaAlmacenes(): void {
    this.conductorService.obtenerAlmacenesRegistrados(this.conductorId).subscribe({
      next: (almacenes) => {
        this.almacenes = almacenes;
      },
      error: (error) => console.error('Error al obtener la lista de almacenes:', error)
    });
  }

  private redirigirAInicio(): void {
    console.error('No userId provided');
    this.router.navigate(['/']);
  }

  editarConductor(): void {
    this.activeTab = 'edit';
  }

  cambiarPass(): void {
    this.activeTab = 'changePass';
  }

  reloadData(): void {
    this.cargarDatosConductor();
    this.obtenerListaAlmacenes();
  }

  handleSave(): void {
    this.activeTab = 'details';
    this.reloadData();
  }
}
