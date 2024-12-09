import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CrearEventoComponent } from '../crear-evento/crear-evento.component';
import { EventoService } from '../../../services/evento.service';
import { EventoRequest } from '../../../interfaces/evento-request';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [MatIcon,RouterLink,RouterOutlet],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private eventoService: EventoService,
  ) {}

  logOut(){
    localStorage.clear();
    window.location.href= '/main';  }
}
