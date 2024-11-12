// src/app/registro-almacen/registro-almacen.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-registro-almacen',
  standalone: true, // Indica que es un componente independiente
  imports: [ReactiveFormsModule, HttpClientModule], // Importa módulos que el componente necesita
  templateUrl: './registro-almacen.component.html',
  styleUrls: ['./registro-almacen.component.css']
})
export class RegistroAlmacenComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
    console.log('Formulario enviado:', this.registroForm.value);
  }
}
