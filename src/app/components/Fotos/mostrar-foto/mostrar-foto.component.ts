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
      this.fileUploadService.getAlmacenFoto(this.username)?.subscribe(
        (response: string | null) => {
          this.photoUrl = response;
        },
        (error: any) => {
          console.error('Error al obtener la foto', error);
        }
      ) || this.fileUploadService.getConductorFoto(this.username).subscribe(
        (response: string | null) => {
          this.photoUrl = response;
        },
        (error: any) => {
          console.error('Error al obtener la foto', error);
        }
      );
    }
  }




}
