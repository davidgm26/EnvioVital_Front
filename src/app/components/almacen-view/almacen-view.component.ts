import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaEventosAlmacenComponent } from '../lista-eventos-almacen/lista-eventos-almacen.component';
import { Evento } from '../../interfaces/evento';
import { AlmacenService } from '../../services/almacen.service';
import { UsuarioService } from "../../services/usuario.service";
import {AlmacenFormComponent} from "../almacen-form/almacen-form.component";
import {CambiarPassComponent} from "../cambiar-pass/cambiar-pass.component";
import {NgClass, NgIf} from "@angular/common";


@Component({
  selector: 'app-almacen-view',
  templateUrl: './almacen-view.component.html',
  standalone: true,
  imports: [ListaEventosAlmacenComponent],
  styleUrls: ['./almacen-view.component.css']
})
export class AlmacenViewComponent implements OnInit {
  eventos: Evento[] = [];
  almacen: any = {};
  provinciaNombre: string = '';
  usuarioUsername: string = '';
  almacenId!: number;
  userId!: number;
  activeTab: string = 'details';
  @Output() reloadDataEvent = new EventEmitter<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private almacenService: AlmacenService
  ) {}

  ngOnInit(): void {
    this.reloadDataEvent.subscribe(() => this.reloadData());
    this.almacenId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.almacenId) {
      this.cargarDatosAlmacen();
      this.obtenerListaEventos(); // Llamamos a obtenerListaEventos al inicializar
    } else {
      this.redirigirAInicio();
    }
  }

  // Método para cargar los datos del almacén
  private cargarDatosAlmacen(): void {
    this.almacenService.obtenerAlmacenPorId(this.almacenId).subscribe({
      next: (almacen) => {
        this.almacen = almacen; // Asignamos los datos del almacén a la propiedad almacen
        this.cargarProvincia(almacen.idProvincia); // Llamamos a cargarProvincia con el ID de la provincia
        this.cargarUsuario(almacen.idUsuario); // Llamamos a cargarUsuario con el ID del usuario
      },
      error: (error) => console.error('Error al cargar los datos del almacén:', error)
    });
  }

  // Método para cargar la provincia relacionada con el almacén
  private cargarProvincia(idProvincia: number): void {
    this.almacenService.obtenerProvincias().subscribe({
      next: (provincias) => {
        const provincia = provincias.find((p) => p.id === idProvincia);
        this.provinciaNombre = provincia ? provincia.nombre : 'Provincia desconocida';
      },
      error: (error) => console.error('Error al cargar las provincias:', error)
    });
  }

  // Método para cargar los datos del usuario asociado al almacén
  private cargarUsuario(idUsuario: number): void {
    this.almacenService.obtenerUsuarioPorId(idUsuario).subscribe({
      next: (usuario) => {
        this.usuarioUsername = usuario ? usuario.username : 'Usuario desconocido';
        this.userId = usuario ? usuario.id : 0;  // Asignamos el userId aquí
      },
      error: (error) => console.error('Error al cargar el usuario:', error)
    });
  }

  // Redirige al inicio si no se ha encontrado un ID de almacén válido
  private redirigirAInicio(): void {
    console.error('No almacenId provided');
    this.router.navigate(['/']);
  }

  // Método para editar el almacén
  editarAlmacen(): void {
    this.activeTab = 'edit';
  }

  // Método para obtener la lista de eventos asociados al almacén
  obtenerListaEventos(): void {
    this.almacenService.obtenerListaEventos(this.almacenId).subscribe({
      next: (eventos) => {
        this.eventos = eventos; // Asignamos los eventos a la propiedad eventos
      },
      error: (error) => {
        console.error('Error al obtener la lista de eventos:', error);
        console.log('Detalles del error:', error);
      },
    });
  }

  // Método para redirigir a la página de cambio de contraseña
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
