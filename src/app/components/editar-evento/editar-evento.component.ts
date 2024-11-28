import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Evento } from '../../interfaces/evento';

@Component({
  selector: 'app-editar-evento',
  standalone: true,
  imports: [],
  templateUrl: './editar-evento.component.html',
  styleUrl: './editar-evento.component.css'
})
export class EditarEventoComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public evento: Evento,
  ) {}
}
