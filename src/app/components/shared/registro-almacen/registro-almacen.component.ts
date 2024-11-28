import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {CommonModule, NgFor} from '@angular/common';
import { AlmacenService } from '../../../services/almacen.service';

@Component({
  selector: 'app-registro-almacen',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, CommonModule],
  templateUrl: './registro-almacen.component.html',
  styleUrls: ['./registro-almacen.component.css'],
})
export class RegistroAlmacenComponent implements OnInit {
  registroForm: FormGroup;
  provincias: any[] = [];

  constructor(
    private fb: FormBuilder,
    private almacenRegistroService: AlmacenService
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required], // Obligatorio
      direccion: ['', Validators.required], // Obligatorio
      email: ['', [Validators.required,Validators.email]], // Obligatorio
      idProvincia: [null, Validators.required], // Obligatorio
      descripcion: ['', Validators.required], // Obligatorio
      usuario: this.fb.group({
        username: ['', Validators.required], // Obligatorio
        password: ['', [Validators.required, Validators.minLength(6)]], // Obligatorio + mínimo 6 caracteres
      }),
    });
  }

  ngOnInit(): void {
    this.cargarProvincias();
  }

  private cargarProvincias(): void {
    this.almacenRegistroService.obtenerProvincias().subscribe({
      next: (provincias) => {
        this.provincias = provincias;
      },
      error: (error) => console.error('Error al cargar las provincias:', error),
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const formData = this.registroForm.value;
      this.almacenRegistroService.guardarAlmacen(formData).subscribe({
        next: (response) => {
          console.log('Almacén registrado con éxito:', response);
        },
        error: (error) => {
          console.error('Error al registrar el almacén:', error);
        },
      });
    } else {
      console.log('Formulario inválido, revisa los campos.');
    }
  }
  public get usuario() {
    return this.registroForm.get('usuario') as FormGroup;
  }
}
