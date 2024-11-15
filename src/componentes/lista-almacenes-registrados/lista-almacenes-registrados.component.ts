import { Component, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AlmacenRegistrado } from '../../app/models/almacen-registrado.model';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-lista-almacenes-registrados',
  standalone: true,
  imports: [MatTableModule, NgClass],
  templateUrl: './lista-almacenes-registrados.component.html',
  styleUrls: ['./lista-almacenes-registrados.component.css'],
})
export class ListaAlmacenesRegistradosComponent implements OnInit {
  @Input() almacenes: AlmacenRegistrado[] = [];

  displayedColumns: string[] = ['nombreAlmacen', 'direccionAlmacen', 'nombreEvento', 'descripcionEvento', 'nombreProvincia', 'estado'];

  ngOnInit(): void {}
}
