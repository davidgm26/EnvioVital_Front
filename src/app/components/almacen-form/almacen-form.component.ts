import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AlmacenService } from '../../services/almacen.service';

@Component({
  selector: 'app-almacen-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './almacen-form.component.html',
  styleUrls: ['./almacen-form.component.css'],
  providers: []
})
export class AlmacenFormComponent implements OnInit {
  formulario: FormGroup;
  provincias: any[] = [];
  nombreProvincia: string | null = null;
  almacenId!: number;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private almacenService: AlmacenService
  ) {
    this.formulario = this.crearFormulario();
  }

  ngOnInit(): void {
    this.almacenId = Number(this.route.snapshot.paramMap.get('id'));
    this.almacenId ? this.cargarProvincias() : this.redirigirAInicio();
  }

  private crearFormulario(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      esActivo: [true, Validators.required],
      idProvincia: [null, Validators.required],
    });
  }

  private redirigirAInicio(): void {
    console.error('No almacenId provided');
    this.router.navigate(['/']);
  }

  private cargarProvincias(): void {
    this.almacenService.obtenerProvincias().subscribe({
      next: (provincias) => {
        this.provincias = provincias;
        this.cargarDatosAlmacen();
      },
      error: (error) => console.error("Error al cargar las provincias:", error)
    });
  }

  private cargarDatosAlmacen(): void {
    this.almacenService.obtenerAlmacenPorId(this.almacenId).subscribe({
      next: (almacen) => {
        if (almacen) {
          this.formulario.patchValue({
            nombre: almacen.nombre,
            descripcion: almacen.descripcion,
            direccion: almacen.direccion,
            email: almacen.email,
            esActivo: almacen.esActivo,
            idProvincia: almacen.idProvincia
          });
          this.userId = almacen.idUsuario;
          this.nombreProvincia = this.obtenerNombreProvincia(almacen.idProvincia);
          this.userId && this.cargarUsuario(this.userId);
        }
      },
      error: (error) => console.error("Error al cargar los datos del almacén:", error)
    });
  }

  private obtenerNombreProvincia(idProvincia: number): string | null {
    const provincia = this.provincias.find((prov) => prov.id === idProvincia);
    return provincia ? provincia.nombre : 'Provincia desconocida';
  }

  private cargarUsuario(userId: number): void {
    this.almacenService.obtenerUsuarioPorId(userId).subscribe({
      next: (usuario) => {
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
      error: (error) => console.error("Error al cargar los datos del usuario:", error)
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      console.warn('Formulario inválido');
      return;
    }

    const datosAEnviar = this.prepararDatosAEnviar();

    this.almacenService.actualizarAlmacen(this.almacenId, datosAEnviar).subscribe({
      next: (response) => {
        console.log("Almacén actualizado:", response);
        window.alert('Almacén actualizado exitosamente');
        this.router.navigate([`/almacen-view/${this.almacenId}`]);
      },
      error: (error) => console.error("Error al actualizar el almacén:", error)
    });
  }

  private prepararDatosAEnviar(): any {
    const { nombre, descripcion, direccion, email, esActivo, idProvincia } = this.formulario.value;
    return { nombre, descripcion, direccion, email, esActivo, idProvincia };
  }
}