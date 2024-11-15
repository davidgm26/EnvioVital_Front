import { Component, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AlmacenRegistrado } from '../../app/models/almacen-registrado.model';

@Component({
  selector: 'app-lista-almacenes-registrados',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './lista-almacenes-registrados.component.html',
  styleUrls: ['./lista-almacenes-registrados.component.css'],
})
export class ListaAlmacenesRegistradosComponent implements OnInit {
  @Input() almacenes: AlmacenRegistrado[] = [];

  displayedColumns: string[] = ['nombreAlmacen', 'direccionAlmacen', 'nombreEvento', 'descripcionEvento', 'nombreProvincia'];

  ngOnInit(): void {}
}
