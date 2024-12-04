import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AlmacenService } from '../../services/almacen.service';
import { ProvinciaService } from '../../services/provincia.service';
import { AlmacenResponse } from '../../interfaces/almacen-response';

@Component({
  selector: 'app-almacen-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './almacen-form.component.html',
  styleUrls: ['./almacen-form.component.css'],
  providers: []
})
export class AlmacenFormComponent implements OnInit {
  @Output() onSave: EventEmitter<void> = new EventEmitter<void>();
  @Input() almacen: AlmacenResponse | null = null;
  formulario: FormGroup;
  provincias: any[] = [];
  nombreProvincia: string | null = null;
  almacenId!: number;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private almacenService: AlmacenService,
    private provinciaService: ProvinciaService
  ) {
    this.formulario = this.crearFormulario();
  }

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('id');
    if (storedUserId) {
      this.userId = Number(storedUserId);
      this.cargarProvincias();
      if (this.almacen) {
        this.almacenId = this.almacen.id;
        this.cargarDatosAlmacen();
      } else {
        this.obtenerAlmacenId();
      }
    } else {
      this.redirigirAInicio();
    }
  }

  private crearFormulario(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      esActivo: [true, Validators.required],
      provincia: ['', Validators.required],
    });
  }

  private redirigirAInicio(): void {
    console.error('No userId provided');
    this.router.navigate(['/']);
  }

  private obtenerAlmacenId(): void {
    this.almacenService.obtenerAlmacenPorUsuario(this.userId).subscribe({
      next: (almacen) => {
        if (almacen) {
          this.almacenId = almacen.id;
          this.cargarDatosAlmacen();
        } else {
          console.error('No almacen found for the given userId');
          this.redirigirAInicio();
        }
      },
      error: (error) => {
        console.error('Error al obtener el almacen por usuario:', error);
        this.redirigirAInicio();
      }
    });
  }

  private cargarProvincias(): void {
    this.provinciaService.obtenerProvincias().subscribe({
      next: (provincias) => {
        this.provincias = provincias;
        if (this.almacen) {
          this.cargarDatosAlmacen();
        }
      },
      error: (error) => console.error("Error al cargar las provincias:", error)
    });
  }

  private cargarDatosAlmacen(): void {
    if (this.almacen) {
      this.formulario.patchValue({
        nombre: this.almacen.nombre,
        descripcion: this.almacen.descripcion,
        direccion: this.almacen.direccion,
        email: this.almacen.email,
        esActivo: this.almacen.esActivo,
        provincia: this.almacen.provincia
      });
      this.nombreProvincia = this.almacen.provincia;
    } else {
      this.almacenService.obtenerAlmacenPorId(this.almacenId).subscribe({
        next: (almacen) => {
          if (almacen) {
            this.formulario.patchValue({
              nombre: almacen.nombre,
              descripcion: almacen.descripcion,
              direccion: almacen.direccion,
              email: almacen.email,
              esActivo: almacen.esActivo,
              provincia: almacen.provincia
            });
            this.nombreProvincia = almacen.provincia;
          }
        },
        error: (error) => console.error("Error al cargar los datos del almacén:", error)
      });
    }
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      console.warn('Formulario inválido');
      return;
    }

    const datosAEnviar = this.prepararDatosAEnviar();

    this.almacenService.actualizarAlmacen(this.almacenId, datosAEnviar).subscribe({
      next: () => {
        alert("Almacén actualizado exitosamente");
        this.onSave.emit(); // Emitir evento cuando se complete la operación
      },
      error: (error) => console.error("Error al actualizar el almacén:", error)
    });
  }

  private prepararDatosAEnviar(): any {
    const { nombre, descripcion, direccion, email, esActivo, provincia } = this.formulario.value;
    const idProvincia = this.provincias.find(p => p.nombre === provincia)?.id;
    return { id: this.almacenId, nombre, descripcion, direccion, email, esActivo, idProvincia };
  }
}
