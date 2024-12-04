import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConductorService } from '../../services/conductor.service';

@Component({
  selector: 'app-conductor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './conductor-form.component.html',
  styleUrls: ['./conductor-form.component.css'],
  providers: []
})
export class ConductorFormComponent implements OnInit {
  @Output() onSave: EventEmitter<void> = new EventEmitter<void>();
  formulario: FormGroup;
  conductorId!: number;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private conductorService: ConductorService
  ) {
    this.formulario = this.crearFormulario();
  }

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('id');
    if (storedUserId) {
      this.userId = Number(storedUserId);
      this.cargarDatosConductor();
    } else {
      this.redirigirAInicio();
    }
  }

  private crearFormulario(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}[A-Za-z]$/)]],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      fechaNacimiento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  private redirigirAInicio(): void {
    console.error('No userId provided');
    this.router.navigate(['/']);
  }

  private cargarDatosConductor(): void {
    this.conductorService.obtenerConductorPorUsuario(this.userId).subscribe({
      next: (conductor) => {
        if (conductor) {
          this.conductorId = conductor.id;
          this.formulario.patchValue({
            nombre: conductor.nombre,
            apellidos: conductor.apellidos,
            dni: conductor.dni,
            direccion: conductor.direccion,
            telefono: conductor.telefono,
            fechaNacimiento: conductor.fechaNacimiento,
            email: conductor.email
          });
        } else {
          console.error('No conductor found for the given userId');
          this.redirigirAInicio();
        }
      },
      error: (error) => {
        console.error('Error al obtener el conductor por usuario:', error);
        this.redirigirAInicio();
      }
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      console.warn('Formulario inválido');
      return;
    }

    const datosAEnviar = this.prepararDatosAEnviar();

    this.conductorService.actualizarConductor(this.conductorId, datosAEnviar).subscribe({
      next: () => {
        alert('Conductor actualizado exitosamente');
        this.onSave.emit();
      },
      error: (error) => console.error('Error al actualizar el conductor:', error)
    });
  }

  private prepararDatosAEnviar(): any {
    const { nombre, apellidos, dni, direccion, telefono, fechaNacimiento, email } = this.formulario.value;
    return { nombre, apellidos, dni, direccion, telefono, fechaNacimiento, email };
  }
}
