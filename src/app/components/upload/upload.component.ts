import { Component, EventEmitter, Output } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  standalone: true
})
export class UploadComponent {
  @Output() photoUploaded = new EventEmitter<string>(); // Emitir la URL al componente padre

  constructor(private fileUploadService: FileUploadService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Llamar al servicio para subir el archivo
      this.fileUploadService.uploadFile(file).subscribe({
        next: (url) => {
          this.photoUploaded.emit(url); // Emitir la URL obtenida del backend
        },
        error: (err) => console.error('Error al subir la foto:', err),
      });
    }
  }
}
