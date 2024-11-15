import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AlmacenRegistrado} from "../app/models/almacen-registrado.model";

@Injectable({
  providedIn: 'root'
})
export class ConductorService {
  private apiUrl = 'http://localhost:8081/conductores';
  private provinciasUrl = 'http://localhost:8081/provincias/lista';
  private usuarioUrl = 'http://localhost:8081/usuarios';

  constructor(private http: HttpClient) { }

  // Obtener un conductor por su ID
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


}
