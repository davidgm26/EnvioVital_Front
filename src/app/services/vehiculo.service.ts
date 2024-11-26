import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from '../../env/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private http: HttpClient) { }

  traerVehiculos() {
  return this.http.get(`${environment.apiUrl}/vehiculos`);
  }

}
