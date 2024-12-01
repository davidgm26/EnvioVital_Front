import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlmacenRegistrado } from '../interfaces/almacen-registrado';
import { environment } from '../../env/environment';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  obtenerConductorPorId(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/conductores/${id}`, { headers: this.getAuthHeaders() });
  }

  obtenerConductorPorUsuario(idUsuario: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/conductores/usuario/${idUsuario}`, { headers: this.getAuthHeaders() });
  }

  actualizarConductor(id: number, datos: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/conductores/editar/${id}`, datos, { headers: this.getAuthHeaders() });
  }

  obtenerProvincias(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/provincias/lista`, { headers: this.getAuthHeaders() });
  }

  obtenerUsuarioPorId(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/usuarios/${id}`, { headers: this.getAuthHeaders() });
  }

  obtenerAlmacenesRegistrados(conductorId: number): Observable<AlmacenRegistrado[]> {
    return this.http.get<AlmacenRegistrado[]>(`${environment.apiUrl}/conductores/almacenesRegistrados/${conductorId}`, { headers: this.getAuthHeaders() });
  }

  obtenerListaVehiculos(conductorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/conductores/vehiculosRegistrados/${conductorId}`);
  }

  eliminarVehiculo(idVehiculo: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/vehiculos/eliminar/${idVehiculo}`, { headers: this.getAuthHeaders() });
  }
}
