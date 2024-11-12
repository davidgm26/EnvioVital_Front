// src/app/registro-almacen/registro-almacen.component.ts
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { AlmacenRegistroService } from '../../services/almacen-registro.service';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-registro-almacen',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpCl], // Asegúrate de importar HttpClientModule y ReactiveFormsModule si estás usando standalone components
  templateUrl: './registro-almacen.component.html',
  styleUrls: ['./registro-almacen.component.css']
})
export class RegistroAlmacenComponent {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private almacenRegistroService: AlmacenRegistroService // Inyecta el servicio aquí
  ) {
    this.registroForm = this.fb.group({
      nombre: [''],
      direccion: [''],
      email: [''],
      idProvincia: [null],
      descripcion: [''],
      usuario: this.fb.group({
        nombreUsuario: ['']
      })
    });
  }

  onSubmit(): void {
    const formData = this.registroForm.value;
    this.almacenRegistroService.guardarAlmacen(formData).subscribe({
      next: (response) => {
        console.log('Almacén registrado con éxito:', response);
      },
      error: (error) => {
        console.error('Error al registrar el almacén:', error);
      }
    });
  }
}
