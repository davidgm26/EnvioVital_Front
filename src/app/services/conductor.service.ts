import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlmacenRegistrado } from '../interfaces/almacen-registrado';
import {ConductorRequestDTO} from "../interfaces/conductor-request-dto";
import { environment } from '../../env/environment';
import { ConductorResponse } from '../interfaces/conductor-response';
import { AlmacenResponse } from '../interfaces/almacen-response';



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
    return this.http.get(`${environment.apiUrl}/conductores/usuario/${id}`, { headers: this.getAuthHeaders() });
  }

  obtenerConductorPorUsuario(idUsuario: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/conductores/usuario/${idUsuario}`, { headers: this.getAuthHeaders() });
  }

  actualizarConductor(id: number, datos: ConductorRequestDTO): Observable<ConductorResponse> {
    return this.http.put<ConductorResponse>(`${environment.apiUrl}/conductores/editar/${id}`, datos, { headers: this.getAuthHeaders() });
  }

  obtenerUsuarioPorId(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/usuarios/${id}`, { headers: this.getAuthHeaders() });
  }

  obtenerListaVehiculos(conductorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/conductores/vehiculosRegistrados/${conductorId}`);
  }
  obtenerAlmacenesRegistrados(conductorId: number): Observable<AlmacenResponse[]> {
    return this.http.get<AlmacenResponse[]>(`${environment.apiUrl}/conductores/almacenesRegistrados/${conductorId}`, { headers: this.getAuthHeaders() });
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

  eliminarVehiculo(idVehiculo: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/vehiculos/eliminar/${idVehiculo}`, { headers: this.getAuthHeaders() });
  }

  registrarConductorEnEvento(eventoAlmacenId: number, conductorId: number,idAlmacen:number): Observable<any> {
    return this.http.post(`${environment.apiUrl}/conductores/registrarse/${eventoAlmacenId}/${conductorId}/${idAlmacen}`, null, { headers: this.getAuthHeaders() });
  }

  comprobarInscripcion(idEventoAlmacen: number, idConductor:number,idAlmacen: number): Observable<Boolean> {
    return this.http.get<Boolean>(`${environment.apiUrl}/conductores/inscripcion/${idEventoAlmacen}/${idConductor}/${idAlmacen}`, { headers: this.getAuthHeaders() });
  }

  eliminarConductorDeEventoAlmacen(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/conductores/eliminarRegistro/${id}`, { headers: this.getAuthHeaders() });
  }


}
