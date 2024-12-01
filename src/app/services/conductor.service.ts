import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConductorRequestDTO } from '../interfaces/conductor-request-dto';
import { ConductorResponse } from '../interfaces/conductor-response';
import { environment } from '../../env/environment';
import { AlmacenResponse } from '../interfaces/almacen-response';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {
  private usuarioUrl = '/api/usuarios';

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

  actualizarConductor(id: number, datos: ConductorRequestDTO): Observable<ConductorResponse> {
    return this.http.put<ConductorResponse>(`${environment.apiUrl}/conductores/editar/${id}`, datos, { headers: this.getAuthHeaders() });
  }

  obtenerUsuarioPorId(id: number): Observable<any> {
    return this.http.get(`${this.usuarioUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  obtenerAlmacenesRegistrados(conductorId: number): Observable<AlmacenResponse[]> {
    return this.http.get<AlmacenResponse[]>(`${environment.apiUrl}/almacenesRegistrados/${conductorId}`, { headers: this.getAuthHeaders() });
  }

  obtenerListaVehiculos(conductorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/vehiculosRegistrados/${conductorId}`, { headers: this.getAuthHeaders() });
  }

  guardarConductor(data: ConductorRequestDTO): Observable<any> {
    return this.http.post<ConductorRequestDTO>(`${environment.apiUrl}/conductores/guardar`, data);
  }

  obtenerConductores(): Observable<ConductorResponse[]> {
    return this.http.get<ConductorResponse[]>(`${environment.apiUrl}/conductores/lista`);
  }

  changeConductorState(id: number): Observable<ConductorResponse> {
    return this.http.put<ConductorResponse>(`${environment.apiUrl}/conductores/estado/${id}`, {}, {headers: this.getAuthHeaders()});
  }

  deleteConductor(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/conductores/eliminar/${id}`, {headers: this.getAuthHeaders()});
  }

}
