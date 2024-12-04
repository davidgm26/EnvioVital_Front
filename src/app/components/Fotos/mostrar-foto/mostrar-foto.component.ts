import { Component, Input, OnInit } from '@angular/core';
import { FileUploadService } from '../../../services/file-upload.service';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-mostrar-foto',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './mostrar-foto.component.html',
  styleUrl: './mostrar-foto.component.css'
})
export class MostrarFotoComponent {
  @Input() username: string | null = null;
  photoUrl: string | null = null;

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    if (this.username) {
      this.fileUploadService.getAlmacenFoto(this.username)?.subscribe( // Se obtiene la foto del almacén
        (response: string | null) => {  // Se recibe la respuesta
          this.photoUrl = response;    // Se guarda la URL de la foto
          const imgElement = document.createElement('img'); // Se crea un elemento de imagen
          if (typeof this.photoUrl === "string") { // Si la URL de la imagen es un string
            imgElement.src = this.photoUrl;
          } // Se establece la URL de la imagen
          document.body.appendChild(imgElement); // Se añade el elemento img al body
        },
        (error: any) => {
          console.error('Error al obtener la foto', error); // Se muestra un mensaje de error
        }



      ) || this.fileUploadService.getConductorFoto(this.username).subscribe( // Se obtiene la foto del conductor
        (response: string | null) => {   // Se recibe la respuesta
          this.photoUrl = response;
          const imgElement = document.createElement('img'); // Se crea un elemento de imagen
          if (typeof this.photoUrl === "string") { // Si la URL de la imagen es un string
            imgElement.src = this.photoUrl;
          } // Se establece la URL de la imagen
          document.body.appendChild(imgElement); // Se añade el elemento img al body// Se guarda la URL de la foto
        },
        (error: any) => {                // Se muestra un mensaje de error
          console.error('Error al obtener la foto', error);     // Se muestra un mensaje de error
        }
      );
    }
  }




}
