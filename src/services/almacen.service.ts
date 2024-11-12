import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {
  private apiUrl = 'http://localhost:8081/almacenes';
  private provinciasUrl = 'http://localhost:8081/provincias/lista';

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
}