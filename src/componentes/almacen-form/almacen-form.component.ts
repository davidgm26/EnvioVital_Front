import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
  provincias: any[] = [];
  nombreProvincia: string | null = null;
  almacenId!: number;
  userId!: number; // Añadir una propiedad para almacenar el id del usuario

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private almacenService: AlmacenService
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      esActivo: [true, Validators.required],
      idProvincia: [null, Validators.required],
      usuario: this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.almacenId = +id;
      this.cargarProvincias();
    } else {
      console.error('No almacenId provided');
      this.router.navigate(['/']); // Redirigir a una ruta válida
    }
  }

  cargarProvincias(): void {
    this.almacenService.obtenerProvincias().subscribe(
      (provincias) => {
        this.provincias = provincias;
        this.cargarDatosAlmacen();
      },
      (error) => {
        console.error("Error al cargar las provincias:", error);
      }
    );
  }

  cargarDatosAlmacen(): void {
    this.almacenService.obtenerAlmacenPorId(this.almacenId).subscribe(
      (almacen) => {
        if (almacen) {
          this.formulario.patchValue({
            nombre: almacen.nombre,
            descripcion: almacen.descripcion,
            direccion: almacen.direccion,
            email: almacen.email,
            esActivo: almacen.esActivo,
            idProvincia: almacen.idProvincia
          });

          this.userId = almacen.idUsuario; // Almacenar el idUsuario para cargar los datos del usuario

          const provinciaSeleccionada = this.provincias.find(
            (provincia) => provincia.id === almacen.idProvincia
          );
          this.nombreProvincia = provinciaSeleccionada ? provinciaSeleccionada.nombre : 'Provincia desconocida';

          // Cargar datos del usuario si existe idUsuario
          if (this.userId) {
            this.cargarUsuario(this.userId);
          }
        }
      },
      (error) => {
        console.error("Error al cargar los datos del almacén:", error);
      }
    );
  }

  cargarUsuario(userId: number): void {
    this.almacenService.obtenerUsuarioPorId(userId).subscribe(
      (usuario) => {
        if (usuario) {
          this.formulario.patchValue({
            usuario: {
              username: usuario.username,
              password: '' // Deja la contraseña vacía por seguridad
            }
          });
          console.log("Datos del usuario cargados en el formulario:", usuario);
        }
      },
      (error) => {
        console.error("Error al cargar los datos del usuario:", error);
      }
    );
  }

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
      idProvincia: this.formulario.value.idProvincia,
      usuario: {
        username: this.formulario.value.usuario.username,
        password: this.formulario.value.usuario.password
      }
    };

    const datosFiltrados = JSON.parse(JSON.stringify(datosAEnviar));

    this.almacenService.actualizarAlmacen(this.almacenId, datosFiltrados).subscribe(
      (response) => {
        console.log("Almacén actualizado:", response);

        // Mostrar mensaje de confirmación
        window.alert('Almacén actualizado exitosamente');

        // Redirigir al usuario a la vista de almacen-view con el id correspondiente
        this.router.navigate([`/almacen-view/${this.almacenId}`]);
      },
      (error) => {
        console.error("Error al actualizar el almacén:", error);
      }
    );
  }
}
