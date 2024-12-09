import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from "../../services/evento.service";
import { AlmacenService} from "../../services/almacen.service";
import { Evento } from "../../interfaces/evento";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarjeta-evento',
  standalone: true,
  imports: [CommonModule, RouterLink],
  providers: [MatSnackBar],
  templateUrl: './tarjeta-evento.component.html',
  styleUrls: ['./tarjeta-evento.component.css']
})
export class TarjetaEventoComponent implements OnInit {
  @Input() evento?: Evento;
  idAlmacen!: number;
  registrado: boolean = false;
  rol: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private eventoService: EventoService,
    private almacenService: AlmacenService,
    private snackBar: MatSnackBar,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage.getItem('logged') === 'true') {
      this.rol = localStorage.getItem('rol');
      if (this.rol === 'ALMACEN') {
        const storedUserId = localStorage.getItem('id');
        if (storedUserId) {
          const userId = Number(storedUserId);
          this.almacenService.obtenerAlmacenPorUsuario(userId).subscribe({
            next: (almacen) => {
              this.idAlmacen = almacen.id;
              if (this.evento) {
                this.checkRegistrationStatus();
              }
            },
            error: (error: any) => console.error('Error al obtener el almacén:', error)
          });
        } else {
          console.error('No userId found in localStorage');
        }
      }
    }
  }

  checkRegistrationStatus(): void {
    if (this.evento && this.idAlmacen) {
      this.almacenService.obtenerListaEventos(this.idAlmacen).subscribe({
        next: (eventos) => {
          this.registrado = eventos.some((evento: { idEvento: number; }) => evento.idEvento === this.evento!.id);
        },
        error: (error: any) => console.error('Error al verificar registro:', error)
      });
    }
  }

  registrarse(): void {
    if (this.evento && this.idAlmacen) {
      this.almacenService.registrarseEnEvento(this.evento.id, this.idAlmacen).subscribe({
        next: () => {
          this.toastr.success('Registro con éxito', 'Éxito');
          this.registrado = true;
        },
        error: (error: any) => this.toastr.error('Error al registrarse', 'Error')
      });
    }
  }
}
