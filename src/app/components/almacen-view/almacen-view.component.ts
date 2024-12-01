import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaEventosAlmacenComponent } from '../lista-eventos-almacen/lista-eventos-almacen.component';
import { Evento } from '../../interfaces/evento';
import { AlmacenService } from '../../services/almacen.service';
import { AlmacenFormComponent } from "../almacen-form/almacen-form.component";
import { CambiarPassComponent } from "../cambiar-pass/cambiar-pass.component";
import { NgClass, NgIf } from "@angular/common";
import { ProvinciaService } from '../../services/provincia.service';

@Component({
  selector: 'app-almacen-view',
  templateUrl: './almacen-view.component.html',
  standalone: true,
  imports: [ListaEventosAlmacenComponent, AlmacenFormComponent, CambiarPassComponent, NgClass, NgIf],
  styleUrls: ['./almacen-view.component.css']
})
export class AlmacenViewComponent implements OnInit {
  almacen: any = {};
  usuarioUsername: string = '';
  almacenId!: number;
  userId!: number;
  activeTab: string = 'details';
  eventos: Evento[] = [];
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
        console.log('Datos del almacén recibidos:', almacen);
        this.almacen = almacen;
      },
      error: (error) => {
        console.error('Error al cargar los datos del almacén:', error);
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
  }

  handleSave(): void {
    this.activeTab = 'details';
    this.reloadData();
  }
}
