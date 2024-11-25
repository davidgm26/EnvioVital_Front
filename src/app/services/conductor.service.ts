import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlmacenRegistrado } from '../interfaces/almacen-registrado';
import { ConductorRequestDTO } from '../interfaces/conductor-request-dto';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {
  private apiUrl = 'http://localhost:8081/conductores';
  private provinciasUrl = 'http://localhost:8081/provincias/lista';
  private usuarioUrl = 'http://localhost:8081/usuarios';

  constructor(private http: HttpClient) { }

  obtenerConductorPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Actualizar un conductor
  actualizarConductor(id: number, datos: any): Observable<any> {
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

  obtenerAlmacenesRegistrados(conductorId: number): Observable<AlmacenRegistrado[]> {
    return this.http.get<AlmacenRegistrado[]>(`${this.apiUrl}/almacenesRegistrados/${conductorId}`);
  }
  obtenerListaVehiculos(conductorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vehiculosRegistrados/${conductorId}`);
  }

  guardarConductor(data: ConductorRequestDTO): Observable<any> {
    return this.http.post<ConductorRequestDTO>(`${this.apiUrl}/guardar`, data);
    console.log(data)
  }

  autorizarPeticion() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    return {headers: headers}
  }
}
