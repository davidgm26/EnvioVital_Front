import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from "../../services/evento.service";
import { AlmacenService} from "../../services/almacen.service";
import { Evento } from "../../interfaces/evento";

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
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage.getItem('logged') === 'true') {
      this.rol = localStorage.getItem('rol');
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

  checkRegistrationStatus(): void {
    if (this.evento && this.idAlmacen) {
      console.log('Checking registration status...');
      this.almacenService.obtenerListaEventos(this.idAlmacen).subscribe({
        next: (eventos) => {
          this.registrado = eventos.some((evento: { idEvento: number; }) => evento.idEvento === this.evento!.id);
          console.log('Registration status:', this.registrado);
        },
        error: (error: any) => console.error('Error al verificar registro:', error)
      });
    }
  }

  registrarse(): void {
    if (this.evento && this.idAlmacen) {
      console.log('Attempting to register...');
      this.almacenService.registrarseEnEvento(this.evento.id, this.idAlmacen).subscribe({
        next: () => {
          console.log('Registration successful');
          this.registrado = true;
          this.snackBar.open('Registro con éxito', 'Cerrar', { duration: 3000 });
        },
        error: (error: any) => console.error('Error al registrarse:', error)
      });
    } else {
      console.error('Evento or idAlmacen is not defined');
    }
  }
}
