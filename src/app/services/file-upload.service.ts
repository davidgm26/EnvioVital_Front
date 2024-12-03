import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private apiUrl = 'http://localhost:8081/testUpload'; // URL del endpoint

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    // Obtener el token del almacenamiento local
    const token = localStorage.getItem('token');

    // Configurar las cabeceras. No es necesario incluir Content-Type aquí.
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      ContentType: 'multipart/form-data',
  });

    // Realizar la solicitud POST
    return this.http.post<string>(this.apiUrl, formData, {
      headers: headers, // Pasamos el token en el header
      reportProgress: true, // Útil si quieres mostrar progreso en la carga
      responseType: 'text' as 'json',
    });
  }
}
