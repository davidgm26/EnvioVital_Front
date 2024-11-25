import { NgIf } from '@angular/common';
import { Component,Input } from '@angular/core';
import { AlmacenRegistrado } from '../../interfaces/almacen-registrado';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-gestion-almacenes',
  standalone: true,
  imports: [NgIf,MatIcon],
  templateUrl: './gestion-almacenes.component.html',
  styleUrl: './gestion-almacenes.component.css'
})
export class GestionAlmacenesComponent {

@Input() almacen!: AlmacenRegistrado;

}
