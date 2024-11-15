import { Component, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

export interface Evento {
  idEvento: number;
  nombreEvento: string;
  descripcionEvento: string;
  nombreProvincia: string;
}

@Component({
  selector: 'app-lista-eventos',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css'],
})
export class ListaEventosComponent implements OnInit {
  @Input() eventos: Evento[] = [];

  displayedColumns: string[] = ['idEvento', 'nombreEvento', 'descripcionEvento', 'nombreProvincia'];

  ngOnInit(): void {
  }
}
