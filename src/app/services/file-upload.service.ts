import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private uploadAlmacenUrl = 'http://localhost:8081/almacenes/upload';
  private getAlmacenFotoUrl = 'http://localhost:8081/almacenes/foto';
  private uploadConductorUrl = 'http://localhost:8081/conductores/upload';
  private getConductorFotoUrl = 'http://localhost:8081/conductores/foto';

  constructor(private http: HttpClient) { }

  uploadAlmacenFile(file: File): Observable<any> {
    const formData: FormData = new FormData(); // FormData es una interfaz que permite construir un conjunto de pares clave/valor por medio de un objeto
    formData.append('file', file, file.name); // Se añade un par clave/valor al objeto FormData porque el servidor espera un archivo con el nombre 'file'

    return this.http.post(this.uploadAlmacenUrl, formData, { // Se realiza una petición POST al servidor porque se va a subir un archivo
      responseType: 'text'
    }); // Se indica que se espera una respuesta de tipo texto porque el servidor devuelve la URL de la imagen subida
  }

  getAlmacenFoto(username: string): Observable<string> {
    return this.http.get(`${this.getAlmacenFotoUrl}/${username}`, { responseType: 'text' }); // Se realiza una petición GET al servidor
  }

  uploadConductorFile(file: File): Observable<any> {
    const formData: FormData = new FormData(); // FormData es una interfaz que permite construir un conjunto de pares clave/valor
    formData.append('file', file, file.name); // Se añade un par clave/valor al objeto FormData porque el servidor espera un archivo con el nombre 'file'

    return this.http.post(this.uploadConductorUrl, formData, { // Se realiza una petición POST al servidor porque se va a subir un archivo
      responseType: 'text' // Se indica que se espera una respuesta de tipo texto porque el servidor devuelve la URL de la imagen subida
    });
  }

  getConductorFoto(username: string): Observable<string> {
    return this.http.get(`${this.getConductorFotoUrl}/${username}`, { responseType: 'text' }); // Se realiza una petición GET al servidor
  }
}
