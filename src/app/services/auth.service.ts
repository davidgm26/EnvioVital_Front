import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LoginRequest } from '../interfaces/login-request';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../env/environment';
import { LoginResponse } from '../interfaces/login-response';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object 

  ) { }


  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`,loginRequest);
  }

  isUserLogged(): boolean {
    if (typeof window !== 'undefined' && localStorage.getItem('logged') === 'true') {
      return true;
    }
    return false;
  }

  getTokens(): string | null {
    if(isPlatformBrowser(this.platformId)){
      return localStorage.getItem('token');
    }
    return null;
  }

  removeToken():void {
    localStorage.removeItem('token');
  }
}
