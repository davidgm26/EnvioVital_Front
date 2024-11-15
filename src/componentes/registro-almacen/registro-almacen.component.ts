import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {AlmacenRegistroService} from "../../services/almacen-registro.service";

@Component({
  selector: 'app-registro-almacen',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, NgOptimizedImage],
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
    this.cargarProvincias(); // Llama a cargar las provincias al iniciar
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
