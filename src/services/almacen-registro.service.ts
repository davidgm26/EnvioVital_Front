import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AlmacenRequestDTO} from "../dto/almacen-request-dto";

@Injectable({
  providedIn: 'root'
})
export class AlmacenRegistroService {
  private apiUrl = 'http://localhost:8081/almacenes';
  private provinciasUrl = 'http://localhost:8081/provincias/lista';
  private usuarioUrl = 'http://localhost:8081/usuarios';

  constructor(private http: HttpClient) {}

  guardarAlmacen(data: AlmacenRequestDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl, data); // Cambia el tipo de respuesta si lo necesitas
  }

}
