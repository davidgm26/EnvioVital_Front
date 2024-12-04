import { Inject, Injectable, PLATFORM_ID, EventEmitter } from '@angular/core';
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

  loginStatus = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, loginRequest);
  }

  isUserLogged(): boolean {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('logged') === 'true') {
      return true;
    }
    return false;
  }

  getTokens(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('logged');
    }
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      localStorage.setItem('logged', 'true');
      this.emitLoginStatus(true);
    }
  }

  clearLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
      this.emitLoginStatus(false);
    }
  }

  emitLoginStatus(loggedIn: boolean): void {
    this.loginStatus.emit(loggedIn);
  }
}
