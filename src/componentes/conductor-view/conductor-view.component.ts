import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConductorService } from '../../services/conductor.service';
import { DatePipe, NgIf } from '@angular/common';
import {AlmacenRegistrado} from "../../app/interfaces/almacen-registrado.model";
import {ListaAlmacenesRegistradosComponent} from "../lista-almacenes-registrados/lista-almacenes-registrados.component";

@Component({
  selector: 'app-conductor-view',
  templateUrl: './conductor-view.component.html',
  standalone: true,
  imports: [NgIf, DatePipe, ListaAlmacenesRegistradosComponent],
  styleUrls: ['./conductor-view.component.css']
})
export class ConductorViewComponent implements OnInit {
  conductor: any = {};
  conductorId!: number;
  almacenesRegistrados: AlmacenRegistrado[] = [];

  displayedColumns: string[] = ['idAlmacen', 'nombreAlmacen', 'direccionAlmacen', 'nombreEvento', 'descripcionEvento', 'nombreProvincia'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private conductorService: ConductorService
  ) {}

  ngOnInit(): void {
    this.conductorId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.conductorId) {
      this.cargarDatosConductor();
      this.cargarAlmacenesRegistrados(); // Carga la lista de almacenes registrados
    } else {
      this.redirigirAInicio();
    }
  }

  private cargarDatosConductor(): void {
    this.conductorService.obtenerConductorPorId(this.conductorId).subscribe({
      next: (conductor) => this.conductor = conductor,
      error: (error) => console.error('Error al cargar los datos del conductor:', error)
    });
  }

  private cargarAlmacenesRegistrados(): void {
    this.conductorService.obtenerAlmacenesRegistrados(this.conductorId).subscribe({
      next: (almacenes) => this.almacenesRegistrados = almacenes,
      error: (error) => console.error('Error al cargar los almacenes registrados:', error)
    });
  }

  private redirigirAInicio(): void {
    console.error('No conductorId provided');
    this.router.navigate(['/']);
  }

  editarConductor(): void {
    this.router.navigate([`/conductor/${this.conductorId}`])
      .then(success => console.log('Navigation successful:', success))
      .catch(error => console.error('Navigation error:', error));
  }
}
