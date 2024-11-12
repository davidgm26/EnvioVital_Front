
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { AlmacenRegistroService } from '../../services/almacen-registro.service';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-registro-almacen',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './registro-almacen.component.html',
  styleUrls: ['./registro-almacen.component.css']
})
export class RegistroAlmacenComponent {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private almacenRegistroService: AlmacenRegistroService
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
