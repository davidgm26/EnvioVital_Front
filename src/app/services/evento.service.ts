import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { environment } from '../../env/environment';

export interface EventoResponseDto{
  profilePicture: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
  provincia: string;
  almacenes: any[];
}

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
  API_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}

asignarCabecera(){
  const  headers =new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
  }) ;
  return {headers:headers}
}

    // Obtener el evento por idEvento
  getEventoById(id: number): Observable<any> {
    const options = this.asignarCabecera();
    return this.http.get(`${this.API_URL}/${id}`);
  }

  // Obtener todos los eventos
  getAllEventos(): Observable<EventoResponseDto[]> {
    const options = this.asignarCabecera();
   return this.http.get<any>(`${this.API_URL}/evento/`,options);
    }

  //Obtener solo eventos activos en la pagina Inicio.

  getActiveEventos(): Observable<EventoResponseDto[]> {
    return this.getAllEventos().pipe(
      map(eventos => eventos.filter(evento => evento.activo))
    );
  }

}

