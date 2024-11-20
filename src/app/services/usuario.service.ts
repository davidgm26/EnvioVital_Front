import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarioUrl = 'http://localhost:8081/usuarios'; // Cambia esta URL si es necesario
  private changePasswordUrl = 'http://localhost:8081/auth/change-password'; // URL para cambiar la contraseña

  constructor(private http: HttpClient) {}

  // Obtener usuario por ID
  obtenerUsuarioPorId(id: number): Observable<any> {
    return this.http.get(`${this.usuarioUrl}/${id}`);
  }

  // Cambiar la contraseña del usuario
  changePassword(usuarioId: number, oldPassword: string, newPassword: string): Observable<any> {
    const url = `${this.changePasswordUrl}/${usuarioId}`;
    const changePasswordRequest = { oldPassword, newPassword };
    return this.http.post(url, changePasswordRequest);
  }
}
