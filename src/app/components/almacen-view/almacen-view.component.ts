import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaEventosAlmacenComponent } from '../lista-eventos-almacen/lista-eventos-almacen.component';
import { Evento } from '../../interfaces/evento';
import { AlmacenService } from '../../services/almacen.service';
import { AlmacenFormComponent } from "../almacen-form/almacen-form.component";
import { CambiarPassComponent } from "../cambiar-pass/cambiar-pass.component";
import {NgClass, NgIf, NgStyle} from "@angular/common";
import {SubirFotoComponent} from "../Fotos/subir-foto/subir-foto.component";
import {MostrarFotoComponent} from "../Fotos/mostrar-foto/mostrar-foto.component";
import {FotoUploaderComponent} from "../Fotos/foto-uploader/foto-uploader.component";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";




@Component({
  selector: 'app-almacen-view',
  templateUrl: './almacen-view.component.html',
  standalone: true,
  imports: [
    ListaEventosAlmacenComponent,
    AlmacenFormComponent,
    CambiarPassComponent,
    NgClass,
    NgIf,
    SubirFotoComponent,
    MostrarFotoComponent,
    FotoUploaderComponent
  ],
  styleUrls: ['./almacen-view.component.css']
})
export class AlmacenViewComponent implements OnInit {
  username!: string;
  almacen: any = {};
  usuarioUsername: string = '';
  almacenId!: number;
  userId!: number;
  activeTab: string = 'details';
  eventos: Evento[] = [];
  provinciaNombre: string = '';
  fotoUrl: SafeUrl | null = null; // URL segura para mostrar la foto

  @Output() reloadDataEvent = new EventEmitter<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private almacenService: AlmacenService,
    private sanitizer: DomSanitizer // Necesario para sanitizar URLs


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

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
    }
  }

  private cargarDatosAlmacen(): void {
    this.almacenService.obtenerAlmacenPorUsuario(this.userId).subscribe({
      next: (almacen) => {
        console.log('Datos del almacén recibidos:', almacen);
        this.almacen = almacen;
        this.almacenId = almacen.id;
        this.usuarioUsername = almacen.nombre;
        this.obtenerProvinciaNombre(almacen.idProvincia);
        this.obtenerListaEventos();
      },
      error: (error) => {
        console.error('Error al cargar los datos del almacén:', error);
      }
    });
  }

  private obtenerProvinciaNombre(idProvincia: number): void {
    this.almacenService.obtenerProvincias().subscribe({
      next: (provincias) => {
        const provincia = provincias.find(p => p.id === idProvincia);
        this.provinciaNombre = provincia ? provincia.nombre : 'Desconocida';
      },
      error: (error) => console.error('Error al obtener el nombre de la provincia:', error)
    });
  }

  private obtenerListaEventos(): void {
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
