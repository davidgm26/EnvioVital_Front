import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EventoRequestDto {
  profilePicture: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
  provincia: string;
  almacenes: any[];
}

export interface EventoResponseDto {
  profilePicture?: string;
  nombre?: string;
  descripcion?: string;
  idProvincia?: number;
  nombreProvincia?: string;

}

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private apiUrlEventoPorId = 'http://localhost:8081/evento/evento-inicio';
  private apiUrl = 'http://localhost:8081/evento';
  constructor(private http: HttpClient) {}

  // Obtener el evento por idEvento
  getEventoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrlEventoPorId}/${id}`);
  }

  getAllEventos(): Observable<EventoResponseDto[]> {
    return this.http.get<EventoResponseDto[]>(`${this.apiUrl}/`);  }

}

