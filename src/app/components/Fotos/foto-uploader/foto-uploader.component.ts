import {Component, EventEmitter, Output} from '@angular/core';
import {FileUploadService} from "../../../services/file-upload.service";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-foto-uploader',
  templateUrl: './foto-uploader.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./foto-uploader.component.css']
})
export class FotoUploaderComponent {
  selectedFile: File | null = null;
  uploadedImageUrl: SafeUrl | null = null;
  username: string = ''; // Para obtener la foto por username
  @Output() fileUploaded = new EventEmitter<string>();

  constructor(
    private fileUploadService: FileUploadService,
    private sanitizer: DomSanitizer
  ) {}

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  uploadFile(): void {
    if (this.selectedFile) {
      this.fileUploadService.uploadAlmacenFile(this.selectedFile).subscribe(
        (response) => {
          this.uploadedImageUrl = this.sanitizer.bypassSecurityTrustUrl(response);
          alert('Imagen subida con éxito');
        },
        (error) => {
          console.error('Error al subir la imagen:', error);
        }
      );
    }
  }

  getPhoto(): void {
    if (this.username) {
      this.fileUploadService.getAlmacenFoto(this.username).subscribe(
        (response) => {
          this.uploadedImageUrl = this.sanitizer.bypassSecurityTrustUrl(response);
        },
        (error) => {
          console.error('Error al obtener la imagen:', error);
        }
      );
    }
  }
}
