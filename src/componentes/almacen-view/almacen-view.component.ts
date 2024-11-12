import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlmacenService } from '../../services/almacen.service';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-almacen-view',
  templateUrl: './almacen-view.component.html',
  standalone: true,
  imports: [NgIf],
  styleUrls: ['./almacen-view.component.css']
})
export class AlmacenViewComponent implements OnInit {
  almacen: any;
  provinciaNombre: string = '';
  usuarioUsername: string = '';
  almacenId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private almacenService: AlmacenService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.almacenId = +id;
      this.cargarDatosAlmacen();
    } else {
      console.error('No almacenId provided');
      this.router.navigate(['/']); // Redirect to a valid route
    }
  }

  cargarDatosAlmacen(): void {
    this.almacenService.obtenerAlmacenPorId(this.almacenId).subscribe(
      (almacen) => {
        this.almacen = almacen;
        this.cargarProvincia(almacen.idProvincia);
        this.cargarUsuario(almacen.idUsuario);
      },
      (error) => {
        console.error('Error al cargar los datos del almacén:', error);
      }
    );
  }

  cargarProvincia(idProvincia: number): void {
    this.almacenService.obtenerProvincias().subscribe(
      (provincias) => {
        const provincia = provincias.find((p) => p.id === idProvincia);
        this.provinciaNombre = provincia ? provincia.nombre : 'Provincia desconocida';
      },
      (error) => {
        console.error('Error al cargar las provincias:', error);
      }
    );
  }

  cargarUsuario(idUsuario: number): void {
    this.almacenService.obtenerUsuarioPorId(idUsuario).subscribe(
      (usuario) => {
        this.usuarioUsername = usuario ? usuario.username : 'Usuario desconocido';
      },
      (error) => {
        console.error('Error al cargar el usuario:', error);
      }
    );
  }

  editarAlmacen(): void {
    this.router.navigate([`/almacen/${this.almacenId}`])
      .then(success => {
        console.log('Navigation successful:', success);
      })
      .catch(error => {
        console.error('Navigation error:', error);
      });
  }
}
