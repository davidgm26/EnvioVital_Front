import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { AlmacenRegistroService } from '../../services/almacen-registro.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-registro-almacen',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor],
  templateUrl: './registro-almacen.component.html',
  styleUrls: ['./registro-almacen.component.css'],
  providers: [AlmacenRegistroService],
})
export class RegistroAlmacenComponent implements OnInit {
  registroForm: FormGroup;
  provincias: any[] = [];

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
        username: [''],
        password: [''],
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
    const formData = this.registroForm.value;
    this.almacenRegistroService.guardarAlmacen(formData).subscribe({
      next: (response) => {
        console.log('Almacén registrado con éxito:', response);
      },
      error: (error) => {
        console.error('Error al registrar el almacén:', error);
      },
    });
  }
}
