import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConductorRequestDTO } from '../interfaces/conductor-request-dto';

@Injectable({
  providedIn: 'root',
})
export class ConductorRegistroService {

  private apiUrl = 'http://localhost:8081/conductores';

  constructor(private http: HttpClient) {}

  guardarConductor(data: ConductorRequestDTO): Observable<any> {
    return this.http.post<ConductorRequestDTO>(`${this.apiUrl}/guardar`, data);
    console.log(data)
  }


}
