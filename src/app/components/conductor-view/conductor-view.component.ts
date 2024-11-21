import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaAlmacenesRegistradosComponent } from '../lista-almacenes-registrados/lista-almacenes-registrados.component';
import { ConductorService } from '../../services/conductor.service';
import { UsuarioService } from "../../services/usuario.service";
import {ConductorFormComponent} from "../conductor-form/conductor-form.component";
import {CambiarPassComponent} from "../cambiar-pass/cambiar-pass.component";
import {DatePipe, NgClass, NgIf} from "@angular/common";
import { AlmacenRegistrado } from '../../interfaces/almacen-registrado.model';

@Component({
  selector: 'app-conductor-view',
  templateUrl: './conductor-view.component.html',
  standalone: true,
  imports: [ListaAlmacenesRegistradosComponent, ConductorFormComponent, CambiarPassComponent, NgClass, NgIf, DatePipe],
  styleUrls: ['./conductor-view.component.css']
})
export class ConductorViewComponent implements OnInit {
  conductor: any = {};
  usuarioUsername: string = '';
  conductorId!: number;
  userId!: number;
  activeTab: string = 'details';
  almacenes: AlmacenRegistrado[] = [];
  @Output() reloadDataEvent = new EventEmitter<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private conductorService: ConductorService
  ) {}

  ngOnInit(): void {
    this.reloadDataEvent.subscribe(() => this.reloadData());
    this.conductorId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.conductorId) {
      this.cargarDatosConductor();
      this.obtenerListaAlmacenes();
    } else {
      this.redirigirAInicio();
    }
  }

  private cargarDatosConductor(): void {
    this.conductorService.obtenerConductorPorId(this.conductorId).subscribe({
      next: (conductor) => {
        this.conductor = conductor;
        this.cargarUsuario(conductor.idUsuario);
      },
      error: (error) => console.error('Error al cargar los datos del conductor:', error)
    });
  }

  private cargarUsuario(idUsuario: number): void {
    this.conductorService.obtenerUsuarioPorId(idUsuario).subscribe({
      next: (usuario) => {
        this.usuarioUsername = usuario ? usuario.username : 'Usuario desconocido';
        this.userId = usuario ? usuario.id : 0;
      },
      error: (error) => console.error('Error al cargar el usuario:', error)
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

  private redirigirAInicio(): void {
    console.error('No conductorId provided');
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
  }

  handleSave(): void {
    this.activeTab = 'details';
    this.reloadData();
  }
}
