import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlmacenRegistrado } from '../interfaces/almacen-registrado';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {
  private apiUrl = '/api/conductores';
  private provinciasUrl = '/api/provincias/lista';
  private usuarioUrl = '/api/usuarios';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  obtenerConductorPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  obtenerConductorPorUsuario(idUsuario: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuario/${idUsuario}`, { headers: this.getAuthHeaders() });
  }

  actualizarConductor(id: number, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/editar/${id}`, datos, { headers: this.getAuthHeaders() });
  }

  obtenerProvincias(): Observable<any[]> {
    return this.http.get<any[]>(this.provinciasUrl, { headers: this.getAuthHeaders() });
  }

  obtenerUsuarioPorId(id: number): Observable<any> {
    return this.http.get(`${this.usuarioUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  obtenerAlmacenesRegistrados(conductorId: number): Observable<AlmacenRegistrado[]> {
    return this.http.get<AlmacenRegistrado[]>(`${this.apiUrl}/almacenesRegistrados/${conductorId}`, { headers: this.getAuthHeaders() });
  }

  obtenerListaVehiculos(conductorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vehiculosRegistrados/${conductorId}`, { headers: this.getAuthHeaders() });
  }

}
