import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AlmacenRequestDTO} from "../dto/almacen-request-dto";

@Injectable({
  providedIn: 'root',
})
export class AlmacenRegistroService {

  private apiUrl = 'http://localhost:8081/almacenes';

  constructor(private http: HttpClient) {}

  guardarAlmacen(data: AlmacenRequestDTO): Observable<any> {
    return this.http.post<AlmacenRequestDTO>(`${this.apiUrl}/guardar`, data);
    console.log(data)
  }

}
