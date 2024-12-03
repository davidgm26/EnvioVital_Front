import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaEventosAlmacenComponent } from '../lista-eventos-almacen/lista-eventos-almacen.component';
import { Evento } from '../../interfaces/evento';
import { AlmacenService } from '../../services/almacen.service';
import { AlmacenFormComponent } from "../almacen-form/almacen-form.component";
import { CambiarPassComponent } from "../cambiar-pass/cambiar-pass.component";
import {NgClass, NgIf, NgStyle} from "@angular/common";
import {UploadComponent} from "../upload/upload.component";
import { FileUploadService } from '../../services/file-upload.service';


@Component({
  selector: 'app-almacen-view',
  templateUrl: './almacen-view.component.html',
  standalone: true,
  imports: [ListaEventosAlmacenComponent, AlmacenFormComponent, CambiarPassComponent, NgClass, NgIf, UploadComponent, NgStyle],
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
  fotoUrl: string | null = null; // URL de la imagen subida

  @Output() reloadDataEvent = new EventEmitter<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private almacenService: AlmacenService,
    private fileUploadService: FileUploadService

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

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileUploadService.uploadFile(file).subscribe({
        next: (response) => {
          // Asume que el backend devuelve directamente la URL
          this.fotoUrl = response;
          console.log('Archivo subido exitosamente:', this.fotoUrl);
        },
        error: (error) => {
          console.error('Error al subir el archivo:', error);
        }
      });
    }
  }





}
