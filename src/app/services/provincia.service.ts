import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { Provincia } from '../interfaces/provincia';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  constructor(
    private http: HttpClient,
  ) { }

  
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  obtenerProvincias(): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(`${environment.apiUrl}/provincias/lista`);
  }

  obtenerProvinciaById(id: number): Observable<Provincia> {
    return this.http.get<Provincia>(`${environment.apiUrl}/provincias/${id}`);
  }

}
