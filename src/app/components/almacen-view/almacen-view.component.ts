import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaEventosAlmacenComponent } from '../lista-eventos-almacen/lista-eventos-almacen.component';
import { Evento } from '../../interfaces/evento';
import { AlmacenService } from '../../services/almacen.service';


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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private almacenService: AlmacenService
  ) {}

  ngOnInit(): void {
    this.almacenId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.almacenId) {
      this.cargarDatosAlmacen();
      this.obtenerListaEventos(); // Llamamos a obtenerListaEventos al inicializar
    } else {
      this.redirigirAInicio();
    }
  }

  private cargarDatosAlmacen(): void {
    this.almacenService.obtenerAlmacenPorId(this.almacenId).subscribe({
      next: (almacen) => {
        this.almacen = almacen;
        this.cargarProvincia(almacen.idProvincia); // Se llama a cargarProvincia aquí
        this.cargarUsuario(almacen.idUsuario);
      },
      error: (error) => console.error('Error al cargar los datos del almacén:', error)
    });
  }

  private cargarProvincia(idProvincia: number): void {
    this.almacenService.obtenerProvincias().subscribe({
      next: (provincias) => {
        const provincia = provincias.find((p) => p.id === idProvincia);
        this.provinciaNombre = provincia ? provincia.nombre : 'Provincia desconocida';
      },
      error: (error) => console.error('Error al cargar las provincias:', error)
    });
  }

  private cargarUsuario(idUsuario: number): void {
    this.almacenService.obtenerUsuarioPorId(idUsuario).subscribe({
      next: (usuario) => {
        this.usuarioUsername = usuario ? usuario.username : 'Usuario desconocido';
      },
      error: (error) => console.error('Error al cargar el usuario:', error)
    });
  }

  private redirigirAInicio(): void {
    console.error('No almacenId provided');
    this.router.navigate(['/']);
  }

  editarAlmacen(): void {
    this.router.navigate([`/almacen/${this.almacenId}`])
      .then(success => console.log('Navigation successful:', success))
      .catch(error => console.error('Navigation error:', error));
  }

  obtenerListaEventos(): void {
    this.almacenService.obtenerListaEventos(this.almacenId).subscribe({
      next: (eventos) => {
        this.eventos = eventos;
      },
      error: (error) => {
        console.error('Error al obtener la lista de eventos:', error);
        console.log('Detalles del error:', error);
      },
    });
  }
}
