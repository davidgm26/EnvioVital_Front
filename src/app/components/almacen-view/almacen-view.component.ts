import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaEventosAlmacenComponent } from '../lista-eventos-almacen/lista-eventos-almacen.component';
import { Evento } from '../../interfaces/evento';
import { AlmacenService } from '../../services/almacen.service';
import { AlmacenFormComponent } from "../almacen-form/almacen-form.component";
import { CambiarPassComponent } from "../cambiar-pass/cambiar-pass.component";
import { NgClass, NgIf } from "@angular/common";
import { ListaConductoresComponent } from "../lista-conductores/lista-conductores.component";
import { ProvinciaService } from '../../services/provincia.service';

@Component({
  selector: 'app-almacen-view',
  templateUrl: './almacen-view.component.html',
  standalone: true,
  imports: [ListaEventosAlmacenComponent, AlmacenFormComponent, CambiarPassComponent, NgClass, NgIf, ListaConductoresComponent],
  styleUrls: ['./almacen-view.component.css']
})
export class AlmacenViewComponent implements OnInit {
  almacen: any = {};
  usuarioUsername: string = '';
  almacenId!: number;
  userId!: number;
  activeTab: string = 'details';
  eventos: Evento[] = [];
  conductores: any[] = [];
  provinciaNombre: string = '';
  @Output() reloadDataEvent = new EventEmitter<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private almacenService: AlmacenService,
    private provinciaService: ProvinciaService
  ) {}

  ngOnInit(): void {
    this.reloadDataEvent.subscribe(() => this.reloadData());
    const storedUserId = localStorage.getItem('id');
    if (storedUserId) {
      this.userId = Number(storedUserId);
      this.cargarDatosAlmacen();
    } else {
      this.redirigirAInicio();
    }
  }

   cargarDatosAlmacen(): void {
    this.almacenService.obtenerAlmacenPorUsuario(this.userId).subscribe({
      next: (almacen) => {
        this.almacen = almacen;
        this.almacenId = almacen.id;
        this.usuarioUsername = almacen.nombre;
        this.obtenerListaEventos();
        this.obtenerListaConductores();
      },
      error: (error) => {
      }
    });
  }


   obtenerProvinciaNombre(idProvincia: number): void {
    this.provinciaService.obtenerProvincias().subscribe({
      next: (provincias) => {
        const provincia = provincias.find(p => p.id === idProvincia);
        this.provinciaNombre = provincia ? provincia.nombre : 'Desconocida';
      },
      error: (error) => console.error('Error al obtener el nombre de la provincia:', error)
    });
  }


   obtenerListaEventos(): void {
    this.almacenService.obtenerListaEventos(this.almacenId).subscribe({
      next: (eventos) => {
        this.eventos = eventos;
      },
      error: (error) => console.error('Error al obtener la lista de eventos:', error)
    });
  }

  private obtenerListaConductores(): void {
    this.almacenService.obtenerListaConductores(this.almacenId).subscribe({
      next: (conductores) => {
        this.conductores = conductores;
      },
      error: (error) => console.error('Error al obtener la lista de conductores:', error)
    });
  }

  private redirigirAInicio(): void {
    console.error('No userId provided');
    this.router.navigate(['/']);
  }

  editarAlmacen(): void {
    this.activeTab = 'edit';
  }

  cambiarPass(): void {
    this.activeTab = 'changePass';
  }

  reloadData(): void {
    this.cargarDatosAlmacen();
    this.obtenerListaEventos();
    this.obtenerListaConductores();
  }

  handleSave(): void {
    this.activeTab = 'details';
    this.reloadData();
  }
}
