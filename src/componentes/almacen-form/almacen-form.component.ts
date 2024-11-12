import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlmacenService } from '../../services/almacen.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-almacen-form',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './almacen-form.component.html',
  styleUrls: ['./almacen-form.component.css'],
  providers: [AlmacenService]
})
export class AlmacenFormComponent implements OnInit {
  formulario: FormGroup;
  provincias: any[] = [];  // Lista de provincias
  nombreProvincia: string | null = null; // Nombre de la provincia seleccionada

  constructor(
    private fb: FormBuilder,
    private almacenService: AlmacenService
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      esActivo: [true, Validators.required],
      idProvincia: [null, Validators.required], // ID de provincia
      usuario: this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void {
    this.cargarProvincias();   // Cargar provincias primero, luego cargar datos del almacén
  }

  // Cargar provincias desde el servicio
  cargarProvincias(): void {
    this.almacenService.obtenerProvincias().subscribe(
      (provincias) => {
        this.provincias = provincias;
        console.log("Provincias cargadas:", provincias);
        this.cargarDatosAlmacen();  // Cargar datos del almacén solo después de que se hayan cargado las provincias
      },
      (error) => {
        console.error("Error al cargar las provincias:", error);
      }
    );
  }

  // Cargar datos del almacén
  cargarDatosAlmacen(): void {
    const almacenId = 1; // Suponiendo que obtienes el ID de alguna forma (ej., ruta o variable de estado)

    this.almacenService.obtenerAlmacenPorId(almacenId).subscribe(
      (almacen) => {
        if (almacen) {
          // Cargar valores directamente en el formulario usando los datos del DTO
          this.formulario.patchValue({
            nombre: almacen.nombre,
            descripcion: almacen.descripcion,
            direccion: almacen.direccion,
            email: almacen.email,
            esActivo: almacen.esActivo,
            idProvincia: almacen.idProvincia, // Asignar el idProvincia directamente
            usuario: {
              username: almacen.usuario?.username || '',
              password: '' // Mantener vacío el campo de password por seguridad
            }
          });

          // Buscar el nombre de la provincia usando el idProvincia
          const provinciaSeleccionada = this.provincias.find(
            (provincia) => provincia.id === almacen.idProvincia
          );
          this.nombreProvincia = provinciaSeleccionada ? provinciaSeleccionada.nombre : 'Provincia desconocida';

          console.log("Datos del almacén cargados en el formulario:", almacen);
          console.log("Nombre de la provincia cargado:", this.nombreProvincia);
        }
      },
      (error) => {
        console.error("Error al cargar los datos del almacén:", error);
      }
    );
  }

  // Enviar el formulario
  onSubmit(): void {
    if (this.formulario.invalid) {
      console.warn('Formulario inválido');
      return;
    }

    const datosAEnviar = {
      nombre: this.formulario.value.nombre,
      descripcion: this.formulario.value.descripcion,
      direccion: this.formulario.value.direccion,
      email: this.formulario.value.email,
      esActivo: this.formulario.value.esActivo,
      idProvincia: this.formulario.value.idProvincia, // Aseguramos que solo el ID se envíe
      usuario: {
        username: this.formulario.value.usuario.username,
        password: this.formulario.value.usuario.password
      }
    };

    const datosFiltrados = JSON.parse(JSON.stringify(datosAEnviar));
    console.log("Datos finales a enviar:", datosFiltrados);

    this.almacenService.actualizarAlmacen(1, datosFiltrados).subscribe(
      (response) => {
        console.log("Almacén actualizado:", response);
      },
      (error) => {
        console.error("Error al actualizar el almacén:", error);
      }
    );
  }
}
