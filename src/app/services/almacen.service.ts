import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { AlmacenResponse } from '../interfaces/almacen-response';
import { EventoAlmacenResponse } from '../interfaces/evento-almacen-response';
import { AlmacenRequestDTO } from '../interfaces/almacen-request-dto';

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
  obtenerTodosLosAlmacenes(): Observable<AlmacenResponse[]>{
    return this.http.get<AlmacenResponse[]>(`${environment.apiUrl}/almacenes/lista`);
  }

  obtenerAlmacenPorId(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/almacenes/${id}`, { headers: this.getAuthHeaders() });
  }

  obtenerAlmacenPorUsuario(idUsuario: number): Observable<AlmacenResponse> {
    return this.http.get<AlmacenResponse>(`${environment.apiUrl}/almacenes/usuario/${idUsuario}`, { headers: this.getAuthHeaders() });
  }

  actualizarAlmacen(id: number, datos: AlmacenRequestDTO): Observable<AlmacenResponse> {
    return this.http.put<AlmacenResponse>(`${environment.apiUrl}/almacenes/editar/${id}`, datos, { headers: this.getAuthHeaders() });
  }

  guardarAlmacen(data: AlmacenResponse): Observable<any> {
    return this.http.post<AlmacenResponse>(`${environment.apiUrl}/almacenes/guardar`, data);
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

  obtenerListaConductores(idAlmacen: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/almacenes/listaConductores/${idAlmacen}`, { headers: this.getAuthHeaders() });
  }
  registrarseEnEvento(idEvento: number, idAlmacen: number): Observable<any> {
    return this.http.post(`${environment.apiUrl}/almacenes/registrarse/${idEvento}/${idAlmacen}`, {}, { headers: this.getAuthHeaders() });
  }

  estaRegistradoEnEvento(idEvento: number, idAlmacen: number): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiUrl}/almacenes/estaRegistrado/${idEvento}/${idAlmacen}`, { headers: this.getAuthHeaders() });
  }
  
  borrarAlmacen(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/almacenes/eliminar/${id}`, { headers: this.getAuthHeaders() });
  }

  changeAlmacenState(id: number): Observable<AlmacenResponse> {
    return this.http.put<AlmacenResponse>(`${environment.apiUrl}/almacenes/estado/${id}`, {}, { headers: this.getAuthHeaders() });
  }

  borrarAlmacenDeEvento(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/almacenes/eliminarRegistro/${id}`, { headers: this.getAuthHeaders() });
  }
}
