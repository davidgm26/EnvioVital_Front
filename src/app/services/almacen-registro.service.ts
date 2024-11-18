import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AlmacenRequestDTO} from "../app/interfaces/almacen-request-dto";

@Injectable({
  providedIn: 'root',
})
export class AlmacenRegistroService {

  private apiUrl = 'http://localhost:8081/almacenes';
  private provinciasUrl = 'http://localhost:8081/provincias/lista';

  constructor(private http: HttpClient) {}

  guardarAlmacen(data: AlmacenRequestDTO): Observable<any> {
    return this.http.post<AlmacenRequestDTO>(`${this.apiUrl}/guardar`, data);
    console.log(data)
  }

  obtenerProvincias(): Observable<any[]> {
    return this.http.get<any[]>(this.provinciasUrl);
  }

}
