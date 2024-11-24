import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../interfaces/evento';
import { environment } from '../../env/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(
    private http: HttpClient
  ) 
  {}


  getActiveEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${environment.apiUrl}/evento/activos`);
  }
}
