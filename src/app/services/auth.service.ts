import { Injectable } from '@angular/core';
import { LoginRequest } from '../interfaces/login-request';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario';
import { environment } from '../../env/environment';
import { LoginResponse } from '../interfaces/login-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }


  login(loginRequest: LoginRequest): Observable<LoginResponse> {  
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`,loginRequest);
  }
}
