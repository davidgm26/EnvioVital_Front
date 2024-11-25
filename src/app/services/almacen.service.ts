import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { AlmacenResponse } from '../interfaces/almacen-response';
import { EventoAlmacenResponse } from '../interfaces/evento-almacen-response';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {

  constructor(private http: HttpClient) {}


  obtenerAlmacenPorId(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/almacenes/${id}`);
  }

  actualizarAlmacen(id: number, datos: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/almacenes/editar/${id}`, datos);
  }

  guardarAlmacen(data: AlmacenResponse): Observable<any> {
    return this.http.post<AlmacenResponse>(`${environment.apiUrl}/guardar`, data);
  }


  obtenerProvincias(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/provincias/lista`);
  }

  obtenerUsuarioPorId(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/usuarios/${id}`);
  }

  obtenerAlmacenesPorEventoId(eventoId: number): Observable<EventoAlmacenResponse[]> {
    return this.http.get<EventoAlmacenResponse []>(`${environment.apiUrl}/almacenes/listaregistrados/${eventoId}`);
  }


  obtenerListaEventos(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/listaEventos/${id}`);
  }

}

