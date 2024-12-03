import {Component, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
import {FileUploadService} from "../../services/file-upload.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-subir-foto',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './subir-foto.component.html',
  styleUrl: './subir-foto.component.css'
})
export class SubirFotoComponent {
  @Input() username: string | null = null;                                                          // Nombre de usuario

  selectedFile: File | null = null;
  uploadResponse: string | null = null;                                                             // URL del archivo subido
  uploadType: 'almacen' | 'conductor' = 'almacen';                                                  // Tipo de subida

  constructor(private fileUploadService: FileUploadService) { }

  onFileSelected(event: any): void {                                                                 // Se ejecuta cuando se selecciona un archivo
    this.selectedFile = event.target.files[0];                                                      // Guarda el archivo
  }

  onUpload(): void {                                                                                // Se ejecuta cuando se pulsa el botón de subir archivo en el formulario de subida de archivos
    if (this.selectedFile && this.username) {                                                       // Si hay un archivo seleccionado y un nombre de usuario porque se está subiendo un archivo de almacén o conductor respectivamente para evitar errores en la petición al servidor por falta de datos necesarios para la subida de archivos en el servidor.
      if (this.selectedFile) {                                                                      // Si hay un archivo seleccionado
        this.fileUploadService.uploadAlmacenFile(this.selectedFile).subscribe(                      // Se realiza la petición al servidor
          response => {                                                                        // Se recibe la respuesta
            this.uploadResponse = response;                                                         // Se guarda la URL del archivo subido
          },
          error => {
            console.error('Error al subir el archivo', error);                                       // Se muestra un mensaje de error
          }
        );
      }else if (this.uploadType === 'conductor') { // Si se está subiendo un archivo de conductor
        this.fileUploadService.uploadConductorFile(this.selectedFile).subscribe(                      // Se realiza la petición al servidor
          response => {                                                                          // Se recibe la respuesta
            this.uploadResponse = response;                                                           // Se guarda la URL del archivo subido
          },
          error => {
            console.error('Error al subir el archivo', error);                                        // Se muestra un mensaje de error
          }
        );
      }
    }
  }
}
