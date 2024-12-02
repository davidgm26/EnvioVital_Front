import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {


  constructor(private http: HttpClient) { }

  obtenerTiposVehiculo(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/tiposVehiculo/lista`);
  }


}
