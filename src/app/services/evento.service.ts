import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../interfaces/evento';
import { environment } from '../../env/environment';
import { EventoRequest } from '../interfaces/evento-request';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(
    private http: HttpClient
  ) { }


  autorizarPeticion() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    return { headers: headers }
  }

  getActiveEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${environment.apiUrl}/evento/activos`);
  }

  getAllEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${environment.apiUrl}/evento/`);
  }

  changeEventoState(id: number): Observable<Evento> {
    return this.http.put<Evento>(`${environment.apiUrl}/evento/estado/${id}`, {}, this.autorizarPeticion());
  }

  deleteEvento(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/evento/${id}`, this.autorizarPeticion());
  }

  editEvento(id: number, evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${environment.apiUrl}/evento/${id}`, evento, this.autorizarPeticion());
  }

  createEvento(body : EventoRequest): Observable<Evento> {
    return this.http.post<Evento>(`${environment.apiUrl}/evento/`, body, this.autorizarPeticion());
  }

  editarEvento(id: number, body: EventoRequest): Observable<Evento> {
    return this.http.put<Evento>(`${environment.apiUrl}/evento/${id}`,body,this.autorizarPeticion());
  }
}
