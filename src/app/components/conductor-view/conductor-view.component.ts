import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlmacenRegistrado } from "../../interfaces/almacen-registrado";
import { ListaAlmacenesRegistradosComponent } from "../lista-almacenes-registrados/lista-almacenes-registrados.component";
import { ConductorService } from '../../services/conductor.service';
import { ConductorFormComponent } from "../conductor-form/conductor-form.component";
import { CambiarPassComponent } from "../cambiar-pass/cambiar-pass.component";
import { DatePipe, NgClass, NgIf } from "@angular/common";
import { VehiculoFormComponent } from "../vehiculo-form/vehiculo-form.component";
import { ListaVehiculosComponent } from "../lista-vehiculos/lista-vehiculos.component";

@Component({
  selector: 'app-conductor-view',
  templateUrl: './conductor-view.component.html',
  standalone: true,
  imports: [ListaAlmacenesRegistradosComponent, ConductorFormComponent, CambiarPassComponent, NgClass, NgIf, DatePipe, VehiculoFormComponent, ListaVehiculosComponent],
  styleUrls: ['./conductor-view.component.css']
})
export class ConductorViewComponent implements OnInit {
  conductor: any = {};
  usuarioUsername: string = '';
  conductorId!: number;
  userId!: number;
  activeTab: string = 'details';
  almacenes: AlmacenRegistrado[] = [];
  vehiculos: any[] = [];
  @Output() reloadDataEvent = new EventEmitter<void>();

  constructor(
    private router: Router,
    private conductorService: ConductorService
  ) {}

  ngOnInit(): void {
    this.setDefaultFotoUrl()
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
        this.obtenerListaVehiculos();
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

  private obtenerListaVehiculos(): void {
    this.conductorService.obtenerListaVehiculos(this.conductorId).subscribe({
      next: (vehiculos) => {
        this.vehiculos = vehiculos;
      },
      error: (error) => console.error('Error al obtener la lista de vehículos:', error)
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
    this.obtenerListaVehiculos();
  }

  handleSave(): void {
    this.activeTab = 'details';
    this.reloadData();
  }

  setDefaultFotoUrl(): void {
    if (this.conductor && (!this.conductor.fotoUrl || this.conductor.fotoUrl.trim().length === 0)) {
      this.conductor.fotoUrl = "https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png";
    }
  }
}
