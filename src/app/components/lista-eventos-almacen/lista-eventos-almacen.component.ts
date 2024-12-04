import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { NgClass } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Evento } from '../../interfaces/evento';
import { AlmacenService } from '../../services/almacen.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-eventos-almacen',
  standalone: true,
  imports: [MatTableModule, NgClass, MatIconButton, MatIconModule],
  templateUrl: './lista-eventos-almacen.component.html',
  styleUrls: ['./lista-eventos-almacen.component.css'],
})
export class ListaEventosAlmacenComponent implements OnInit {
  @Input() eventos: Evento[] = [];

  displayedColumns: string[] = ['nombreEvento', 'descripcionEvento', 'nombreProvincia', 'estado', 'eliminar'];

  constructor(private http: HttpClient,
              private almacenService: AlmacenService,
              private toastr: ToastrService) {}

  ngOnInit(): void {}

  eliminarRegistro(id: number) {
    this.almacenService.borrarAlmacenDeEvento(id).subscribe({
      next: (response) => {
        this.toastr.success('Registro eliminado correctamente');
        this.eventos = this.eventos.filter((evento) => evento.id !== id);
      },
      error: (error) => {
        this.toastr.error('Error al eliminar el registro');
      }
    });
  }
}
