import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EventoRequestDto {
  profilePicture?: string;
  nombre?: string;
  descripcion?: string;
  idProvincia?: number;
  nombreProvincia?: string;


}
@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private apiUrl = 'http://localhost:8081/evento/evento-inicio/3';

  constructor(private http: HttpClient) {}

  getEventoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
