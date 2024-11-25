import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TipoVehiculoService {

  private apiUrl = 'http://localhost:8081/tipoVehiculos';

  constructor(private http: HttpClient) { }



}
