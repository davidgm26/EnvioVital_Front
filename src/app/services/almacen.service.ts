import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { AlmacenResponse } from '../interfaces/almacen-response';
import { EventoAlmacenResponse } from '../interfaces/evento-almacen-response';
import { AlmacenRegistrado } from '../interfaces/almacen-registrado';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  obtenerTodosLosAlmacenes(): Observable<AlmacenRegistrado[]>{
    return this.http.get<AlmacenRegistrado[]>(`${environment.apiUrl}/almacenes/lista`);
  }

  obtenerAlmacenPorId(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/almacenes/${id}`, { headers: this.getAuthHeaders() });
  }

  obtenerAlmacenPorUsuario(idUsuario: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/almacenes/usuario/${idUsuario}`, { headers: this.getAuthHeaders() });
  }

  actualizarAlmacen(id: number, datos: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/almacenes/editar/${id}`, datos, { headers: this.getAuthHeaders() });
  }

  guardarAlmacen(data: AlmacenResponse): Observable<any> {
    return this.http.post<AlmacenResponse>(`${environment.apiUrl}/guardar`, data, { headers: this.getAuthHeaders() });
  }

  obtenerUsuarioPorId(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/usuarios/${id}`, { headers: this.getAuthHeaders() });
  }

  obtenerAlmacenesPorEventoId(eventoId: number): Observable<EventoAlmacenResponse[]> {
    return this.http.get<EventoAlmacenResponse []>(`${environment.apiUrl}/almacenes/listaregistrados/${eventoId}`);
  }

  obtenerListaEventos(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/almacenes/listaEventos/${id}`, { headers: this.getAuthHeaders() });
  }

  borrarAlmacen(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/almacenes/eliminar/${id}`, { headers: this.getAuthHeaders() });
  }
}
