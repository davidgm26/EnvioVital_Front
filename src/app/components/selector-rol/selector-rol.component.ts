import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { Rol } from '../../interfaces/rol';
import { SelectorCardComponent } from '../shared/selector-card/selector-card.component';

@Component({
  selector: 'app-selector-rol',
  standalone: true,
  imports:  [MatCardModule, MatCardModule, MatChipsModule,
    MatProgressBarModule, MatButtonModule, SelectorCardComponent, NgFor],
  templateUrl: './selector-rol.component.html',
  styleUrl: './selector-rol.component.css'
})
export class SelectorRolComponent {

  roles: Rol[] = [
    { nombre: 'Conductor', descripcion: 'Para voluntarios que aporten su transporte para la recogida y envío de recursos materiales hacia el punto de interés.' },
    { nombre: 'Almacen', descripcion: 'Punto de recogida de recursos materiales donados.' }
  ];


}
