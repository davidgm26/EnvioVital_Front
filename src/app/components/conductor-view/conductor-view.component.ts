import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AlmacenRegistrado } from "../../interfaces/almacen-registrado.model";
import { ListaAlmacenesRegistradosComponent } from "../lista-almacenes-registrados/lista-almacenes-registrados.component";
import { ConductorService } from '../../services/conductor.service';
import { UsuarioService } from "../../services/usuario.service";

@Component({
  selector: 'app-conductor-view',
  templateUrl: './conductor-view.component.html',
  standalone: true,
  imports: [DatePipe, ListaAlmacenesRegistradosComponent],
  styleUrls: ['./conductor-view.component.css']
})
export class ConductorViewComponent implements OnInit {
  conductor: any = {};
  conductorId!: number;
  userId!: number; // Variable para almacenar el userId
  almacenesRegistrados: AlmacenRegistrado[] = [];
  displayedColumns: string[] = ['idAlmacen', 'nombreAlmacen', 'direccionAlmacen', 'nombreEvento', 'descripcionEvento', 'nombreProvincia'];
  usuarioUsername: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private conductorService: ConductorService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.conductorId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.conductorId) {
      this.cargarDatosConductor();
      this.cargarAlmacenesRegistrados();
    } else {
      this.redirigirAInicio();
    }
  }

  private cargarDatosConductor(): void {
    this.conductorService.obtenerConductorPorId(this.conductorId).subscribe({
      next: (conductor) => {
        this.conductor = conductor;

        if (conductor.idUsuario) {
          // Si tenemos el idUsuario, cargamos los datos del usuario
          this.cargarUsuario(conductor.idUsuario);
        } else {
          console.error('idUsuario no encontrado en los datos del conductor');
        }
      },
      error: (error) => console.error('Error al cargar los datos del conductor:', error)
    });
  }

  private cargarUsuario(idUsuario: number): void {
    this.usuarioService.obtenerUsuarioPorId(idUsuario).subscribe({
      next: (usuario) => {
        if (usuario) {
          this.usuarioUsername = usuario.username;
          this.userId = usuario.id;  // Asignamos el userId aquí
        } else {
          this.usuarioUsername = 'Usuario desconocido';
          this.userId = 0;  // Si no se encuentra usuario, asignamos un valor por defecto
          console.error('Usuario no encontrado');
        }
      },
      error: (error) => console.error('Error al cargar el usuario:', error)
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
    this.router.navigate([`/conductor-perfil/editar/${this.conductorId}`])
      .then(success => console.log('Navigation successful:', success))
      .catch(error => console.error('Navigation error:', error));
  }

  cambiarPass(): void {
    if (this.userId) {
      this.router.navigate([`/cambiar-pass/${this.userId}`])
        .then(success => console.log('Navigation successful:', success))
        .catch(error => console.error('Navigation error:', error));
    } else {
      console.error('User ID is missing');
    }
  }
}
