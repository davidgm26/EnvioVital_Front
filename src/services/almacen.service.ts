import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AlmacenResponseDTO {
  id: number;
  nombre: string;
  descripcion: string;
  direccion: string;
  email: string;
  esActivo: boolean;
  provincia: string;
  idUsuario: number;
}

export interface EventoAlmacenDtoResponse {
  idEvento: number;
  idAlmacen: number;
  nombreAlmacen: string;
  nombreEvento: string;
  almacen: AlmacenResponseDTO;
}

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {
  private apiUrl = 'http://localhost:8081/almacenes';
  private provinciasUrl = 'http://localhost:8081/provincias/lista';
  private usuarioUrl = 'http://localhost:8081/usuarios';
  private almacenPorEventoUrl = 'http://localhost:8081/almacenes/listaregistrados';


  constructor(private http: HttpClient) {}


  // Obtener un almacén por su ID
  obtenerAlmacenPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Actualizar un almacén
  actualizarAlmacen(id: number, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/editar/${id}`, datos);
  }

  // Obtener lista de provincias
  obtenerProvincias(): Observable<any[]> {
    return this.http.get<any[]>(this.provinciasUrl);
  }

  // Obtener un usuario por su ID
  obtenerUsuarioPorId(id: number): Observable<any> {
    return this.http.get(`${this.usuarioUrl}/${id}`);
  }


  // Obtener el almacén asociado a un evento
  obtenerAlmacenPorEventoId(eventoId: number): Observable<AlmacenResponseDTO[]> {
    return this.http.get<AlmacenResponseDTO []>(`${this.almacenPorEventoUrl}/${eventoId}`);
  }




}

export class EventoAlmacenDtoResponse {
}
